import "./userinfo.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VideocamIcon from "@mui/icons-material/Videocam";
import EditIcon from "@mui/icons-material/Edit";
import { useUserStore } from "../../../lib/userStore";

const UserInfo = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <MoreHorizIcon className="icon" />
        <VideocamIcon className="icon" />
        <EditIcon className="icon" />
      </div>
    </div>
  );
};

export default UserInfo;
