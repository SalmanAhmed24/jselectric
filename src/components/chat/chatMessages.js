"use client";
import { Poppins } from "next/font/google";
import "./style.scss";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import Messages from "./messages";
import { apiPath } from "@/utils/routes";
import { useDispatch, useSelector } from "react-redux";
import Pusher from "pusher-js";
import { storeNotification } from "@/store/slices/notification";

const poppins = Poppins({
  weight: ["300", "500", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});

function ChatMessages({ currentChat, loggedInUser }) {
  const [messageArr, setMessageArr] = useState([]);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification.notification);
  var interval;
  var pusher = new Pusher("07be80edc6aa2291c746", {
    cluster: "ap2",
  });
  var channel = pusher.subscribe("message-channel");
  // useEffect(() => {

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [currentChat]);
  useEffect(() => {
    getChatMessages();
    interval = setInterval(() => {
      getChatMessages();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, [currentChat]);
  const handleMessages = (e) => {
    e.preventDefault();
    var dataObj = {
      sender: loggedInUser.id,
      content: message,
      chatId: currentChat._id,
    };
    axios
      .post(`${apiPath.devPath}/api/message/addMessage`, dataObj)
      .then((res) => {
        const newMessageChatId =
          res.data && res.data.messages && res.data.messages.chat._id;
        if (newMessageChatId !== currentChat._id) {
          setMessageArr([...messageArr, res.data.messages]);
          setMessage("");
        } else {
          channel.bind("latest-message", function (data) {
            if (notification.length) {
              dispatch(storeNotification([data, ...notification]));
            } else {
              dispatch(storeNotification([data]));
            }
          });
          setMessageArr([...messageArr, res.data.messages]);
          setMessage("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getChatMessages = async () => {
    if (currentChat == null) {
      return false;
    } else {
      try {
        const result = await axios.get(
          `${apiPath.prodPath}/api/message/${currentChat._id}`
        );
        setMessageArr(result.data.messages);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return currentChat == undefined ? (
    <p className={poppins.className} style={{ fontSize: "22px" }}>
      Select a Chat from the side bar
    </p>
  ) : (
    <div className="main-message-wrap">
      <div className={"chat-header"}>
        <div className="user-chat-names">
          <p>
            {currentChat &&
              currentChat.users
                .filter((i) => i._id !== loggedInUser.id)
                .map((inner, ind) => {
                  return (
                    <span className={poppins.className} key={ind}>
                      {ind == currentChat.users.length - 2
                        ? `${inner.fullname}`
                        : `${inner.fullname},`}
                    </span>
                  );
                })}
          </p>
        </div>
      </div>
      {messageArr.length ? (
        <Messages
          messageArr={messageArr}
          currentChat={currentChat}
          loggedInUser={loggedInUser}
        />
      ) : (
        <div className="no-result-wrap">
          <p className={poppins.className}>Say Hi 👋</p>
        </div>
      )}
      <form className="message-form" onSubmit={handleMessages}>
        <input
          value={message}
          type="text"
          className={`${poppins.className} message-inp`}
          onChange={(e) => setMessage(e.target.value)}
          required={true}
        />
        <input
          type="submit"
          value={"Send"}
          className={`${poppins.className} send-msg-btn`}
        />
      </form>
    </div>
  );
}

export default ChatMessages;
