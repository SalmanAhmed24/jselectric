import React, { useState, useEffect } from "react";
import ChatBox from "./chatBox";
import { apiPath } from "@/utils/routes";

import { useRouter } from "next/navigation";
import axios from "axios";
const ChatList = ({ allChats, currentUser }) => {
  const handleSeen = (chatId) => {
    console.log("currentUser", currentUser);
    const dataObj = {
      currentUserId: currentUser.id,
    };
    axios
      .post(`${apiPath.devPath}/api/chat/seenBy/${chatId}`, dataObj)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const router = useRouter();
  return allChats.map((chat, index) => {
    return (
      <div
        onClick={() => {
          handleSeen(chat.id);
          router.push(`/chat/${chat.id}`);
        }}
        key={chat.id}
        className={chat.isGroup ? "group-chatbox" : "single-chatbox"}
      >
        <ChatBox chat={chat} index={index} user={currentUser} />
      </div>
    );
  });
};
export default ChatList;
