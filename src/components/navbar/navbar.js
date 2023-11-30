"use client";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { storeCurrentChat } from "../../store/slices/chatSlice";
import { storeNotification } from "../../store/slices/notification";
import "./navbar.scss";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "600"],
  subsets: ["latin"],
});
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { storeUser } from "../../store/slices/userSlice";
function Navbar() {
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification.notification);
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {}, [user, notification]);
  const handleLogout = () => {
    dispatch(storeUser(null));
    router.push("/login");
  };
  const handleNotification = (chat) => {
    dispatch(storeCurrentChat(chat));
    router.push("/chat");
    dispatch(storeNotification([]));
  };
  // const filteredNot = notification.filter(
  //   (i) => user && user.user.userInfo.id !== i.sender._id
  // );
  return (
    <>
      {user.user == null || user.user.error ? null : (
        <div className={`${poppins.className} navbar-wrap`}>
          <Link href={"/"} className={path == "/" ? "activeTop" : ""}>
            Dashboard
          </Link>
          <Link href={"/list"} className={path == "/list" ? "activeTop" : ""}>
            List
          </Link>
          <Link
            href={"/purchasing"}
            className={path == "/purchasing" ? "activeTop" : ""}
          >
            Purchasing
          </Link>
          <Link href={"/jobs"} className={path == "/jobs" ? "activeTop" : ""}>
            Jobs
          </Link>
          <Link
            href={"/finance"}
            className={path == "/finance" ? "activeTop" : ""}
          >
            Finance
          </Link>
          <Link
            href={"/reports"}
            className={path == "/reports" ? "activeTop" : ""}
          >
            Reports
          </Link>
          <Link
            href={"/pics&files"}
            className={path == "/pics&files" ? "activeTop" : ""}
          >
            Pic / Files
          </Link>
          <Link
            href={"/settings"}
            className={path == "/settings" ? "activeTop" : ""}
          >
            Settings
          </Link>
          <div className="logout-wrap">
            <div className="img-wrap" style={{ position: "relative" }}>
              <Link href={"/chat"}>
                <img src="./chat.png" className="chat-img" />
              </Link>
              {/* {filteredNot.length ? (
                <span className={`${poppins.className} notification-ind`}>
                  {filteredNot.length}
                </span>
              ) : null} */}
              {/* {filteredNot.length ? (
                <div className="notification-bar">
                  {filteredNot.map((i) => {
                    return (
                      <p
                        onClick={() => handleNotification(i.chat)}
                        key={i._id}
                        className={`${poppins.className} not-msg`}
                      >
                        Message from {i.sender.fullname}
                      </p>
                    );
                  })}
                </div>
              ) : null} */}
            </div>
            <button
              className={`${poppins.className} logout`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
