import "./detail.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DownloadIcon from "@mui/icons-material/Download";
import { auth } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { arrayRemove, arrayUnion, updateDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();
  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        block: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          culpa voluptatibus totam. .
        </p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Setting</span>
            <KeyboardArrowUpIcon className="arrowIcon" fontSize="large" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <KeyboardArrowUpIcon className="arrowIcon" fontSize="large" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <KeyboardArrowDownIcon className="arrowIcon" fontSize="large" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://www.capcom-games.com/megaman/exe/assets/images/top/first-view_main.png"
                  alt=""
                />
                <span>randomText.png</span>
              </div>
              <DownloadIcon fontSize="large" className="downIcon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://www.capcom-games.com/megaman/exe/assets/images/top/first-view_main.png"
                  alt=""
                />
                <span>randomText.png</span>
              </div>
              <DownloadIcon fontSize="large" className="downIcon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://www.capcom-games.com/megaman/exe/assets/images/top/first-view_main.png"
                  alt=""
                />
                <span>randomText.png</span>
              </div>
              <DownloadIcon fontSize="large" className="downIcon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared File</span>
            <KeyboardArrowDownIcon className="arrowIcon" fontSize="large" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? " Your are blocked"
            : isReceiverBlocked
            ? "Unblock User"
            : "Block User"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Detail;
