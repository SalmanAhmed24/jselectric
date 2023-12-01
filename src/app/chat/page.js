"use client";
import { Poppins } from "next/font/google";
import "./style.scss";
const poppins = Poppins({
  weight: ["300", "500", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});
import React, { useState, useEffect } from "react";
import ChatList from "../../components/chat/chatlist";
import ChatMessages from "../../components/chat/chatMessages";

import { storeAllChat } from "../../store/slices/allChatSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import { storeCurrentChat } from "@/store/slices/chatSlice";
import { useRouter } from "next/navigation";
function Chat() {
  const router = useRouter();
  const loggedInUser = useSelector((state) =>
    state.user.user == null ? null : state.user.user.userInfo
  );
  const currentChat = useSelector((state) => state.currentChat.currentChat);
  useEffect(() => {
    if (loggedInUser == null) {
      router.push("/");
    } else {
      getAllChats();
    }
  }, []);
  const dispatch = useDispatch();
  const getAllChats = () => {
    axios
      .get(
        `${apiPath.prodPath}/api/chats/${
          loggedInUser == null ? null : loggedInUser.id
        }`
      )
      .then((res) => {
        dispatch(storeAllChat(res.data.allChats));
        if (res.data.allChats && res.data.allChats.length) {
          dispatch(storeCurrentChat(res.data.allChats[0]));
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="chat-wrap">
      <div className="chat-contacts">
        <div className={poppins.className}>
          <ChatList />
        </div>
      </div>
      <div className="chat-message-con">
        {currentChat == null ? null : (
          <ChatMessages currentChat={currentChat} loggedInUser={loggedInUser} />
        )}
      </div>
    </div>
  );
}

export default Chat;
