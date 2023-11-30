"use client";
import { Poppins } from "next/font/google";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { apiPath } from "@/utils/routes";
const poppins = Poppins({
  weight: ["300", "500", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});
import Select from "react-select";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { storeCurrentChat } from "../../store/slices/chatSlice";
import { storeAllChat } from "../../store/slices/allChatSlice";
import AllChats from "./allChats";
function ChatList() {
  const [userOpt, setUserOpt] = useState([]);
  const [chatUser, setChatUser] = useState("");
  const [loader, setLoader] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupChatUser, setGroupChatUser] = useState([]);
  const [singleChatFlag, setSingleChatFlag] = useState(true);
  const [groupChatFlag, setGroupChatFlag] = useState(false);
  const loggedInUser = useSelector((state) => state.user.user.userInfo);
  const currentChat = useSelector((state) => state.currentChat.currentChat);
  const allChats = useSelector((state) => state.allChats.allChats);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`${apiPath.prodPath}/api/users/`).then(({ data }) => {
      setUserOpt(
        data.allUsers
          .map((i) => {
            return {
              label: i.fullname,
              value: i._id,
              ...i,
            };
          })
          .filter((item) => item.fullname !== loggedInUser.fullname)
          .sort((a, b) => a.label.localeCompare(b.label))
      );
    });
    getAllChats();
  }, []);
  const handleChatForm = (e) => {
    e.preventDefault();
    if (singleChatFlag) {
      setLoader(true);
      const dataObj = {
        userId: chatUser.value,
        loggedInUserId: loggedInUser.id,
      };
      axios
        .post(`${apiPath.prodPath}/api/chats/addChat`, dataObj)
        .then((res) => {
          if (!allChats.find((item) => item._id == res.data._id)) {
            dispatch(storeAllChat([res.data, ...allChats]));
          }
          dispatch(storeCurrentChat(res.data.allChat));
          setLoader(false);
          setChatUser("");
          getAllChats();
        })
        .catch((err) => console.log(err));
    }
    if (groupChatFlag) {
      const userIDArr = groupChatUser.map((i) => i.value);
      setLoader(true);
      const dataObj = {
        usersArr: JSON.stringify(userIDArr),
        loggedInUser: loggedInUser.id,
        chatName: groupName,
      };
      axios
        .post(`${apiPath.prodPath}/api/chats/groupChat`, dataObj)
        .then((res) => {
          if (!allChats.find((item) => item._id == res.data._id)) {
            dispatch(storeAllChat([res.data, ...allChats]));
          }

          dispatch(storeCurrentChat(res.data.allChats));
          setLoader(false);
          setChatUser("");
          setGroupName("");
          setSingleChatFlag(true);
          setGroupChatFlag(false);
          setGroupChatUser([]);
          getAllChats();
        })
        .catch((err) => console.log(err));
    }
  };
  const getAllChats = () => {
    setLoader(true);
    axios
      .get(`${apiPath.prodPath}/api/chats/${loggedInUser.id}`)
      .then((res) => {
        dispatch(storeAllChat(res.data.allChats));
        setLoader(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="chat-btns-wrap">
        <button
          className={poppins.className}
          onClick={() => {
            setSingleChatFlag(true);
            setGroupChatFlag(false);
          }}
        >
          Single Chat
        </button>
        <button
          className={poppins.className}
          onClick={() => {
            setSingleChatFlag(false);
            setGroupChatFlag(true);
          }}
        >
          Group Chat
        </button>
      </div>
      {singleChatFlag ? (
        <form onSubmit={handleChatForm}>
          <Select
            options={userOpt}
            value={chatUser}
            onChange={(v) => setChatUser(v)}
            placeholder="Chat with..."
            className={poppins.className}
            required={true}
          />
          <input
            type="submit"
            value={loader ? "Loading..." : "Go"}
            className={`${poppins.className} chat-btn`}
          />
        </form>
      ) : null}
      {groupChatFlag ? (
        <form onSubmit={handleChatForm}>
          <input
            text="type"
            placeholder="Group Name"
            onChange={(e) => setGroupName(e.target.value)}
            className={`${poppins.className} group-chat-inp`}
            required={true}
          />
          <Select
            options={userOpt}
            value={groupChatUser}
            isMulti
            onChange={(v) => setGroupChatUser(v)}
            placeholder="Add Peoples..."
            className={poppins.className}
            required={true}
          />
          <input
            type="submit"
            value={loader ? "Loading..." : "Go"}
            className={`${poppins.className} chat-btn`}
          />
        </form>
      ) : null}
      {loader ? (
        <p>Loading...</p>
      ) : (
        <AllChats
          loggedInUser={loggedInUser}
          allChats={allChats}
          currentChat={currentChat}
        />
      )}
    </div>
  );
}

export default ChatList;
