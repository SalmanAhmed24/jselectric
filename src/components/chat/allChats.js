import { Poppins } from "next/font/google";
import axios from "axios";
import { storeCurrentChat } from "../../store/slices/chatSlice";
import { useDispatch } from "react-redux";

import React, { useState, useEffect } from "react";
const poppins = Poppins({
  weight: ["300", "500", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});
import "./style.scss";
function AllChats({ loggedInUser, allChats, currentChat }) {
  const dispatch = useDispatch();
  const handleChatInner = (chat) => {
    dispatch(storeCurrentChat(chat));
  };
  console.log("allChats", allChats);
  return (
    <div className="allchats-wrap">
      {loggedInUser == null ? null : allChats && allChats.length ? (
        <div className="chats-row-con">
          {allChats
            .filter((item) => item.isGroupChat == false)
            .map((i) => {
              return i.users.map((inner) => {
                if (inner.fullname !== loggedInUser.fullname) {
                  return (
                    <div
                      onClick={() => handleChatInner(i)}
                      key={inner._id}
                      className={
                        currentChat && currentChat._id == i._id
                          ? "activeChat chats-row"
                          : "chats-row"
                      }
                    >
                      <div className="circle-initials">
                        <h1 className={poppins.className}>
                          {inner.fullname
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </h1>
                      </div>
                      <p className={poppins.className}>{inner.fullname}</p>
                    </div>
                  );
                }
              });
            })}
        </div>
      ) : (
        <p className={poppins.className}>No Chats found</p>
      )}
      <h1
        className={poppins.className}
        style={{ marginTop: 20, marginBottom: 10, fontWeight: "bold" }}
      >
        Group Chats
      </h1>
      {allChats &&
      allChats.length &&
      allChats.filter((item) => item.isGroupChat == true).length ? (
        <div className="chats-row-con">
          {allChats
            .filter((item) => item.isGroupChat == true)
            .map((i) => {
              return (
                <div
                  onClick={() => handleChatInner(i)}
                  key={i._id}
                  className={
                    currentChat && currentChat._id == i._id
                      ? "activeChat chats-row"
                      : "chats-row"
                  }
                >
                  <div className="circle-initials">
                    <h1 className={poppins.className}>
                      {i.chatName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </h1>
                  </div>
                  <div className="group-inner-wrap">
                    <p className={poppins.className}>{i.chatName}</p>
                    <div className="participates">
                      {i.users.map((inner, ind) => {
                        if (inner.fullname !== loggedInUser.fullname) {
                          return (
                            <span key={ind} className={poppins.className}>
                              {ind == i.users.length - 2
                                ? `${inner.fullname}`
                                : `${inner.fullname},`}
                            </span>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <p className={poppins.className}>No Group Chats found</p>
      )}
    </div>
  );
}

export default AllChats;
