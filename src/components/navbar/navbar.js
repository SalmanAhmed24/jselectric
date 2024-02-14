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
import Pusher from "pusher-js";

var pusher = new Pusher("07be80edc6aa2291c746", {
  cluster: "ap2",
});
var channel;

function Navbar() {
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification.notification);
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  const [filteredNot, setFilteredNot] = useState([]);
  useEffect(() => {
    const result = removedLoggedInUser(notification);
    setFilteredNot(result);
    channel = pusher.subscribe("chat-live");
    channel.bind("add-message", function (data) {
      if (notification.length == 0) {
        dispatch(storeNotification([data.message]));
      } else {
        dispatch(storeNotification([data.message, ...notification]));
      }
    });
    return () => {
      pusher.unsubscribe("chat-live");
    };
  }, [user, notification]);
  const handleLogout = () => {
    dispatch(storeUser(null));
    router.push("/login");
  };
  const handleNotification = (chat) => {
    dispatch(storeCurrentChat(chat));
    router.push("/chat");
    dispatch(storeNotification([]));
  };
  const removedLoggedInUser = (notificationObj) => {
    var receiverArr = [];
    notificationObj.forEach((i) => {
      i.chat.users.forEach((element) => {
        if (element.fullname !== i.sender.fullname) {
          receiverArr = [
            {
              fullname: element.fullname,
              latestMsg: i.content,
              chat: i.chat,
              sender: i.sender.fullname,
            },
            ...receiverArr,
          ];
        }
      });
    });
    return receiverArr;
  };
  console.log("this is notification", notification);
  // const filteredNot =
  //   user.user == null
  //     ? []
  //     : notification.filter(
  //         (i) => user && user.user.userInfo.id !== i.sender._id
  //       );
  console.log("this is filterNot", filteredNot);
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
            <div className="img-wrap">
              <Link href={"/task"}>
                <img src="./checklist.png" className="chat-img" />
              </Link>
            </div>
            <div className="img-wrap" style={{ position: "relative" }}>
              <Link href={"/chat"}>
                <img src="./chat.png" className="chat-img" />
              </Link>
              {filteredNot.length ? (
                filteredNot.find(
                  (i) => i.sender == user.user.userInfo.fullname
                ) ? null : filteredNot.find(
                    (i) => i.fullname == user.user.userInfo.fullname
                  ) ? (
                  <span className={`${poppins.className} notification-ind`}>
                    {filteredNot.length}
                  </span>
                ) : null
              ) : null}
              {filteredNot.length ? (
                filteredNot.find(
                  (i) => i.sender == user.user.userInfo.fullname
                ) ? null : filteredNot.find(
                    (i) => i.fullname == user.user.userInfo.fullname
                  ) ? (
                  <div className="notification-bar">
                    {filteredNot.map((i) => {
                      return (
                        <p
                          onClick={() => handleNotification(i.chat)}
                          key={i._id}
                          className={`${poppins.className} not-msg`}
                        >
                          Message from {i.sender}
                        </p>
                      );
                    })}
                  </div>
                ) : null
              ) : null}
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
