"use client";
import { Poppins } from "next/font/google";
import "./style.scss";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import Messages from "./messages";
import { apiPath } from "@/utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { RadioGroup } from "react-rainbow-components";
import Select from "react-select";
import ChatDrawer from "../subComponents/drawers/chatDrawer";
import { storeNotification } from "../../store/slices/notification";
import Pusher from "pusher-js";
const poppins = Poppins({
  weight: ["300", "500", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});
var pusher = new Pusher("07be80edc6aa2291c746", {
  cluster: "ap2",
});
var channel;
function ChatMessages({ currentChat, loggedInUser }) {
  const [messageArr, setMessageArr] = useState([]);
  const [message, setMessage] = useState("");
  const [toolsCheckBox, setToolsCheckBox] = useState("");
  const [allToolsOpt, setAllToolsOpt] = useState([]);
  const [allClientsOpt, setAllClientsOpt] = useState([]);
  const [selectedTool, setSelectedTool] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [chatModalFlag, setChatModalFlag] = useState(false);
  const allChats = useSelector((state) => state.allChats.allChats);
  const notification = useSelector((state) => state.notification.notification);
  const dispatch = useDispatch();
  var interval;
  const options = [
    { value: "Tools", label: "Tools" },
    { value: "Clients", label: "Clients" },
  ];
  useEffect(() => {
    getChatMessages();
    fetchTools();
    fetchClients();
    // interval = setInterval(() => {
    //   getChatMessages();
    // }, 30000);
    // return () => {
    //   clearInterval(interval);
    // };
    channel = pusher.subscribe("chat-live");
    return () => {
      pusher.unsubscribe("chat-live");
    };
  }, [currentChat]);
  useEffect(() => {
    const selectedChat = allChats.filter((i) => i._id !== currentChat._id);
    if (selectedChat.length > 0) {
      sendNotification();
    } else {
      dispatch(storeNotification([]));
    }
  });
  const fetchTools = () => {
    axios
      .get(`${apiPath.prodPath}/api/tools/`)
      .then((res) => {
        const alteredData = res.data.allTools.map((i) => {
          return {
            label: i.description,
            value: i.description,
            ...i,
          };
        });
        setAllToolsOpt(alteredData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchClients = () => {
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        const alteredDataClient = res.data.clients.map((i) => {
          return {
            label: i.customerName,
            value: i.customerName,
            ...i,
          };
        });
        setAllClientsOpt(alteredDataClient);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleMessages = (e) => {
    e.preventDefault();
    var dataObj = {
      sender: loggedInUser.id,
      content: message,
      chatId: currentChat._id,
    };
    axios
      .post(`${apiPath.prodPath}/api/message/addMessage`, dataObj)
      .then((res) => {
        sendNotification();
        setMessageArr([...messageArr, res.data.messages]);
        setMessage("");
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
          `${apiPath.prodPath}/api/message/${currentChat && currentChat._id}`
        );
        setMessageArr(result.data.messages);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleToolCheckBox = (event) => {
    setToolsCheckBox({ value: event.target.value, label: event.target.value });
    setSelectedClient("");
    setSelectedTool("");
  };
  const closeModal = () => {
    setChatModalFlag(!chatModalFlag);
  };
  const sendNotification = () => {
    channel.bind("add-message", function (data) {
      if (notification.length == 0) {
        dispatch(storeNotification([data.message]));
      } else {
        dispatch(storeNotification([data.message, ...notification]));
      }
    });
  };
  const allModulesData = allChats.length
    ? allChats.find((i) => i._id == currentChat._id)
    : [];
  return currentChat == undefined ? (
    <p className={poppins.className} style={{ fontSize: "22px" }}>
      Select a Chat from the side bar
    </p>
  ) : loggedInUser == null ? null : (
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
        <div className="message-form-inputs">
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
        </div>
        <div className="radio-btn-wrap">
          <RadioGroup
            className={poppins.className}
            id="radio-group-component-1"
            options={options}
            value={toolsCheckBox.value}
            onChange={handleToolCheckBox}
          />
          {toolsCheckBox.value == "Tools" ? (
            <Select
              className={`${poppins.className} options-cus`}
              options={allToolsOpt}
              value={selectedTool}
              onChange={(value) => setSelectedTool(value)}
            />
          ) : toolsCheckBox.value == "Clients" ? (
            <Select
              className={`${poppins.className} options-cus`}
              options={allClientsOpt}
              value={selectedClient}
              onChange={(value) => setSelectedClient(value)}
            />
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default ChatMessages;
