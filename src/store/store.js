import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import userSlice from "./slices/userSlice";
const isClient = typeof window !== "undefined";
let persistedReducer;
if (isClient) {
  const persistConfig = {
    key: "root",
    storage: storage,
  };
  const rootReducers = combineReducers({ user: userSlice });
  persistedReducer = persistReducer(persistConfig, rootReducers);
} else {
  persistedReducer = combineReducers({ user: userSlice });
}
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger, thunk],
});
export const persistor = persistStore(store);
