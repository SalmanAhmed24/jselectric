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

const poppins = Poppins({
  weight: ["300", "500", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});

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
  var interval;
  const options = [
    { value: "Tools", label: "Tools" },
    { value: "Clients", label: "Clients" },
  ];
  useEffect(() => {
    getChatMessages();
    fetchTools();
    fetchClients();
    interval = setInterval(() => {
      getChatMessages();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, [currentChat]);
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
      moduleAttachments:
        toolsCheckBox.value == "Tools"
          ? selectedTool
          : toolsCheckBox.value == "Clients"
          ? selectedClient
          : null,
    };
    axios
      .post(`${apiPath.devPath}/api/message/addMessage`, dataObj)
      .then((res) => {
        const newMessageChatId =
          res.data && res.data.messages && res.data.messages.chat._id;
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
  const allModulesData = allChats.length
    ? allChats.find((i) => i._id == currentChat._id)
    : [];
  console.log("####", allModulesData);
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
      {allModulesData.moduleAttachments !== undefined ? (
        <div className="view-module-data-wrap">
          {allModulesData &&
          allModulesData.moduleAttachments &&
          allModulesData.moduleAttachments.length ? (
            <button
              onClick={() => setChatModalFlag(true)}
              className={`${poppins.className} view-modules-data`}
            >
              View Modules Data
            </button>
          ) : null}
        </div>
      ) : null}
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
      {chatModalFlag ? (
        <ChatDrawer
          onClose={closeModal}
          open={chatModalFlag}
          item={allModulesData && allModulesData.moduleAttachments}
        />
      ) : null}
    </div>
  );
}

export default ChatMessages;
