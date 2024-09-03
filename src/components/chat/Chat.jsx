import "./chat.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import VideocamIcon from "@mui/icons-material/Videocam";
import InfoIcon from "@mui/icons-material/Info";
import ImageIcon from "@mui/icons-material/Image";
import MicIcon from "@mui/icons-material/Mic";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState, useRef } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload/upload";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState(null);
  const [text, setText] = useState("");
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();
  const [img, setImg] = useState({ file: null, url: "" });
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);
  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    console.log("send" + text);

    if (text === "") return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text: text,
          ...(imgUrl && { img: imgUrl }),
          createAt: new Date(),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatSnap = await getDoc(userChatRef);

        if (userChatSnap.exists()) {
          const userChatData = userChatSnap.data();
          const chatIndex = userChatData.chats.findIndex(
            (chat) => chat.chatId === chatId
          );

          userChatData.chats[chatIndex].lastMessage = text;
          userChatData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatData.chats[chatIndex].udpatedAt = Date.now();

          await updateDoc(userChatRef, { chats: userChatData.chats });
        }
      });
    } catch (error) {
      console.log(error);
    }
    setText("");
    setImg({ file: null, url: "" });
  };
  console.log("user " + JSON.stringify(user));

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username || "User"}</span>
            <p>Hi, thanks for order a bababa</p>
          </div>
        </div>
        <div className="icons">
          <LocalPhoneIcon fontSize="small" />
          <VideocamIcon fontSize="small" />
          <InfoIcon fontSize="small" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message) => (
          <div
            className={`message ${
              message.senderId === currentUser?.id && "own"
            }`}
            key={message?.createAt}
          >
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
            </div>
          </div>
        ))}

        {img.url && (
          <div className="message own">
            <div className="texts">
              {img.url && <img src={img.url} alt="" />}
            </div>
          </div>
        )}
      </div>
      <div ref={endRef}></div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <ImageIcon fontSize="medium" className="icon" />
            <input
              type="file"
              id="file"
              style={{ display: "none " }}
              onChange={handleImg}
            />
          </label>
          <CameraAltIcon fontSize="medium" className="icon" />
          <MicIcon fontSize="medium" className="icon" />
        </div>
        <input
          type="text"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emojis">
          <EmojiEmotionsIcon
            onClick={() => setOpen(!open)}
            className="emojiIcon"
          />
          <div className="emojiPicker">
            <EmojiPicker open={open} />
          </div>
        </div>
        <button
          className="sendBtn"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          <SendIcon fontSize="medium" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
