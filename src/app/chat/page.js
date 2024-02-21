"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import CreateChatModal from "../../components/subComponents/modal/createChat";
import ChatList from "../../components/chat/chatList";
import LoaderComp from "../../components/loader";
import "./style.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { apiPath } from "@/utils/routes";
import { pusherClient } from "@/utils/pusher";
const poppins = Poppins({
  weight: ["300", "500", "600"],
  subsets: ["latin"],
  style: ["normal"],
});
function ChatPage() {
  const [createChatModal, setCreateChatModal] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [allChats, setAllChats] = useState([]);
  const [loader, setLoader] = useState(false);
  const currentUser = useSelector((state) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    if (currentUser && currentUser.userInfo && currentUser.userInfo == null) {
      router.push("/login");
    }
    getUsers();
    getChats();
  }, [currentUser]);
  useEffect(() => {
    console.log("cr user", currentUser);
    if (currentUser !== undefined && currentUser !== null) {
      pusherClient.subscribe(currentUser.userInfo.id);
      pusherClient.bind("update-chat", handleUpdatedChat);

      return () => {
        if (currentUser !== undefined && currentUser !== null) {
          pusherClient.unsubscribe(currentUser.userInfo.id);
          pusherClient.unbind("update-chat", handleUpdatedChat);
        }
      };
    }
  }, [currentUser]);
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
  const getUsers = async () => {
    setLoader(true);
    await axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        setAllUsers(res.data.allUsers);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
  const handleCreateModal = () => {
    setCreateChatModal(!createChatModal);
  };
  return (
    <section className={`${poppins.className} chat-wrap-main`}>
      <div className="chat-btn-wrap">
        <h1>Create a Single or Group chat</h1>
        <button onClick={handleCreateModal} className={`${poppins.className}`}>
          Create Chat
        </button>
      </div>
      <div className="chat-inner-con">
        <div className="chatlist-wrap">
          {loader && currentUser && currentUser.userInfo !== null ? (
            <LoaderComp />
          ) : (
            <ChatList allChats={allChats} currentUser={currentUser.userInfo} />
          )}
        </div>
      </div>
      <CreateChatModal
        modalFlag={createChatModal}
        modalClose={handleCreateModal}
        allUsers={allUsers}
        currentUser={currentUser}
      />
    </section>
  );
}

export default ChatPage;
