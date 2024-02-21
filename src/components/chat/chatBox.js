import React, { useState, useEffect } from "react";
import moment from "moment";
function ChatBox({ chat, user, index }) {
  const otherMembers = chat?.members?.filter(
    (member) => member._id !== user.id
  );
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }
  const lastMessage =
    chat &&
    chat.messages &&
    chat.messages.length > 0 &&
    chat.messages[chat && chat.messages.length - 1];
  const filteredChatUser =
    chat !== undefined &&
    chat.isGroup == false &&
    chat.members.filter((i) => i._id !== user.id);
  const seen = lastMessage.seenBy.find((member) => member._id == user.id)
    ? true
    : false;
  return (
    <div className="chatbox-inner-wrap">
      <div className="top">
        {chat?.isGroup ? (
          <span className="name">{chat?.name}</span>
        ) : (
          <span className="name">{filteredChatUser[0].fullname}</span>
        )}
        <span className="time">
          {!lastMessage
            ? moment(chat?.createdAt).format("hh:mm a")
            : moment(chat?.lastMessageAt).format("hh:mm a")}
        </span>
      </div>
      <div className="bottom">
        {!lastMessage ? (
          <p className="no-chats">Started A Chat</p>
        ) : (
          <p className={`last-chat ${seen ? "light-grey" : "dark-black"}`}>
            {lastMessage.text}
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatBox;
