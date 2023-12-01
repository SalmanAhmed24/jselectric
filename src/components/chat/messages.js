import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "500", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});
import moment from "moment";
import "./style.scss";
function Messages({ messageArr, loggedInUser, currentChat }) {
  const filteredChats = messageArr.filter((i) => i.chat._id == currentChat._id);
  return (
    <div className="main-message">
      {filteredChats.map((i) => {
        return (
          <div key={i._id} className="row-message">
            {i.sender && i.sender.fullname == loggedInUser.fullname ? (
              <div className={`${poppins.className} self-chat`}>
                <p>{i.content}</p>
                <div>
                  <span>
                    {moment(i.createdAt).format("MM/DD/YYYY")}-
                    {moment(i.createdAt).format("hh:mm a")}
                  </span>
                </div>
              </div>
            ) : (
              <p className={`${poppins.className} other-chat`}>
                <p>{i.content}</p>
                <div>
                  <span>
                    {moment(i.createdAt).format("MM/DD/YYYY")}-
                    {moment(i.createdAt).format("hh:mm a")}
                  </span>
                </div>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
