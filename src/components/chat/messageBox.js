import moment from "moment";
import "./style.scss";
const MessageBox = ({ message, currentUser }) => {
  return message?.sender?._id !== currentUser.id ? (
    <div className="sender">
      <span>{moment(message.createdAt).format("MM/DD/YYYY hh:mm a")}</span>
      <p>{message.text}</p>
      <span style={{ marginTop: "5px" }}>
        {message !== null && message.sender !== null
          ? message.sender.fullname
          : ""}
      </span>
    </div>
  ) : (
    <div className="receiver">
      <span>{moment(message.createdAt).format("MM/DD/YYYY hh:mm a")}</span>
      <p>{message.text}</p>
    </div>
  );
};

export default MessageBox;
