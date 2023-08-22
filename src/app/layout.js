"use client";
import "./global.scss";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700", "600", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
import { store } from "../store/store";
import { Provider } from "react-redux";
import Navbar from "../components/navbar/navbar";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
