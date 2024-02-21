"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import ChatList from "@/components/chat/chatList";
import LoaderComp from "@/components/loader";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import ChatDetailsComp from "../../../components/chat/chatDetail";
import { pusherClient } from "@/utils/pusher";
import "../style.scss";
const poppins = Poppins({
  weight: ["300", "500", "600"],
  subsets: ["latin"],
  style: ["normal"],
});
function ChatDetails() {
  const currentUser = useSelector((state) => state.user.user);
  const router = useRouter();
  const { chatId } = useParams();
  const [allChats, setAllChats] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  useEffect(() => {
    if (currentUser && currentUser.userInfo && currentUser.userInfo == null) {
      router.push("/login");
    }
    getChats();
    if (currentUser && chatId) {
      setSeenBy();
    }
  }, [currentUser, chatId]);
  useEffect(() => {
    if (currentUser !== undefined && currentUser !== null) {
      console.log("cr user", currentUser.userInfo.id);
      pusherClient.subscribe(currentUser.userInfo.id);
      pusherClient.bind("update-chat", handleUpdatedChat);
      return () => {
        if (currentUser !== undefined && currentUser !== null) {
          pusherClient.unsubscribe(currentUser.userInfo.id);
          pusherClient.unbind("update-chat", handleUpdatedChat);
        }
      };
    }
  }, [currentUser, refreshFlag]);
  const handleUpdatedChat = (updatedChat) => {
    console.log("here", updatedChat);
    setAllChats((allChats) =>
      allChats.map((chat) => {
        if (chat._id === updatedChat.id) {
          return { ...chat, messages: updatedChat.messages };
        } else {
          return chat;
        }
      })
    );
  };
  const getChats = async () => {
    if (currentUser && currentUser.userInfo && currentUser.userInfo !== null) {
      setLoader(true);
      await axios
        .get(`${apiPath.devPath}/api/chat/${currentUser.userInfo.id}`)
        .then((res) => {
          setAllChats(res.data.chat);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const setSeenBy = () => {
    const dataObj = {
      currentUserId: currentUser.userInfo.id,
    };
    axios
      .post(`${apiPath.devPath}/api/chat/seenBy/${chatId}`, dataObj)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className={`${poppins.className} chat-detail-con`}>
      <div className="chatlist-wrap">
        {loader ? (
          <LoaderComp />
        ) : currentUser !== null && currentUser.userInfo !== null ? (
          <ChatList allChats={allChats} currentUser={currentUser.userInfo} />
        ) : null}
      </div>
      <div className="single-chat-detail">
        <ChatDetailsComp
          chatId={chatId}
          refresh={() => setRefreshFlag(!refreshFlag)}
          currentUser={
            currentUser !== null && currentUser.userInfo !== null
              ? currentUser.userInfo
              : ""
          }
        />
      </div>
    </div>
  );
}

export default ChatDetails;
