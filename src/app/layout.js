"use client";
import "./global.scss";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700", "600", "900"],
  subsets: ["latin"],
});
import { store } from "../store/store";
import { Provider } from "react-redux";
import Navbar from "../components/navbar/navbar";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider store={store}>
          <div>
            <Navbar />
          </div>
          {children}
        </Provider>
      </body>
    </html>
  );
}
