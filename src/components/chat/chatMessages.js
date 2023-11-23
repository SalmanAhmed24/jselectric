"use client";
import { Poppins } from "next/font/google";
import "./style.scss";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import Messages from "./messages";
import { apiPath } from "@/utils/routes";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { storeNotification } from "../../store/slices/notification";
import { storeCurrentChat } from "@/store/slices/chatSlice";
const poppins = Poppins({
  weight: ["300", "500", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});

// const ENDPOINT = "https://jselectric-backend.vercel.app/";
var socket, selectedChatCompare;

function ChatMessages({ currentChat, loggedInUser }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [messageArr, setMessageArr] = useState([]);
  const [message, setMessage] = useState("");
  const [loader, setLoaderFlag] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification.notification);
  useEffect(() => {
    socket = io("https://jselectric-backend.vercel.app", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    }).connect();
    socket.emit("setup", loggedInUser);
    socket.on("connection", () => setSocketConnected(true));
    console.log("called first");
  }, []);
  useEffect(() => {
    getChatMessages();
    selectedChatCompare = currentChat;
    console.log("called second");
  }, [currentChat]);
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id == newMessageReceived.chat._id
      ) {
        if (notification.includes(newMessageReceived) == false) {
          dispatch(storeNotification([newMessageReceived, ...notification]));
        }
      }
      setMessageArr([...messageArr, newMessageReceived]);
      dispatch(storeCurrentChat(currentChat));
    });
  }, [refreshFlag]);
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
        if (newMessageChatId == currentChat._id) {
          console.log("here in if");
          setMessageArr([...messageArr, res.data.messages]);
          setMessage("");
          socket.emit("new message", res.data.messages);
          setRefreshFlag(!refreshFlag);
        } else {
          console.log("here in else");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getChatMessages = async () => {
    setLoaderFlag(true);
    try {
      const result = await axios.get(
        `${apiPath.devPath}/api/message/${currentChat._id}`
      );
      setMessageArr(result.data.messages);
      setLoaderFlag(false);
      socket.emit("join chat", currentChat._id);
    } catch (error) {
      console.log(error);
      setLoaderFlag(false);
    }
  };
  console.log("@@!!", notification);
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
      {loader ? (
        <p className={poppins.className}>Loading...</p>
      ) : messageArr.length ? (
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
