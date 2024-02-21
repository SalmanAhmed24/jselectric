import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { apiPath } from "@/utils/routes";
import LoaderComp from "../loader";
import { Poppins } from "next/font/google";
import { pusherClient } from "../../utils/pusher/index";
import MessageBox from "../../components/chat/messageBox";
const poppins = Poppins({
  weight: ["300", "500", "600"],
  subsets: ["latin"],
  style: ["normal"],
});
function ChatDetailComp({ chatId, currentUser, refresh }) {
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.devPath}/api/chat/?chatId=${chatId}`)
      .then((res) => {
        console.log("####", res.data.chat);
        setChat(res.data.chat);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    pusherClient.subscribe(chatId);
    pusherClient.bind("new-message", handleMessage);

    return () => {
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("new-message", handleMessage);
    };
  }, [chatId]);
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat?.messages]);
  const handleMessage = async (newMessage) => {
    setChat((prevChat) => {
      return {
        ...prevChat,
        messages: [...prevChat.messages, newMessage],
      };
    });
  };
  const handleChatSend = (e) => {
    e.preventDefault();
    const dataObj = {
      currentUserId: currentUser.id,
      chatId: chatId,
      text: message,
    };
    axios
      .post(`${apiPath.devPath}/api/message/addMessage`, dataObj)
      .then((res) => {
        console.log(res);
        setMessage("");
        refresh();
      })
      .catch((err) => console.log(err));
  };
  const filteredChatUser =
    chat !== undefined &&
    chat.isGroup == false &&
    chat.members.filter((i) => i._id !== currentUser.id);
  return loading ? (
    <LoaderComp />
  ) : chat.length == 0 && chat.members == undefined ? (
    <p>No Chats found</p>
  ) : (
    <div className="chat-detail-inner">
      <div className="top-section">
        {chat && chat.isGroup == true ? (
          <p>
            {chat.name} <span>({chat.members.length} members)</span>
          </p>
        ) : (
          <p>
            {chat.length == 0 && chat.members == undefined
              ? ""
              : filteredChatUser[0].fullname}
          </p>
        )}
      </div>
      <div className="middle-content">
        {chat !== undefined
          ? chat.messages.map((message, index) => {
              return (
                <MessageBox
                  key={index}
                  message={message}
                  currentUser={currentUser}
                />
              );
            })
          : null}
      </div>
      <div ref={bottomRef} />
      <div className="message-inp-wrap">
        <form onSubmit={handleChatSend}>
          <input
            type="text"
            placeholder="Enter Message..."
            className={`${poppins.className} msg-inp`}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <input
            type="submit"
            className={`${poppins.className} send-btn`}
            value="&#10148;"
          />
        </form>
      </div>
    </div>
  );
}

export default ChatDetailComp;
