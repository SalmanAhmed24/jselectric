import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducers = combineReducers({user:userSlice});
const persistedReducer = persistReducer(persistConfig, rootReducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger, thunk],
});
export const persistor = persistStore(store);
