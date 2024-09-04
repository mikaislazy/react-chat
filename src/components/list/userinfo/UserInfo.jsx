import "./userinfo.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VideocamIcon from "@mui/icons-material/Videocam";
import EditIcon from "@mui/icons-material/Edit";
import { useUserStore } from "../../../lib/userStore";
import { useState } from "react";
import ChangeUserInfo from "./changeUserInfo/changeUserInfo";
const UserInfo = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const [ischangeIcon, setChangeIcon] = useState(false);
  console.log(ischangeIcon);

  return (
    <div className="userInfo">
      <div className="user">
        <div className="detail">
          <img
            src={currentUser.avatar || "./avatar.png"}
            alt=""
            onClick={() => setChangeIcon(!ischangeIcon)}
          />
          <h2>{currentUser.username}</h2>
        </div>
        <div className="quote">
          <p>{currentUser.quote}</p>
        </div>
      </div>
      <div className="icons">
        <MoreHorizIcon className="icon" />
        <VideocamIcon className="icon" />
        <EditIcon className="icon" />
      </div>
      {ischangeIcon && <ChangeUserInfo />}
    </div>
  );
};

export default UserInfo;
