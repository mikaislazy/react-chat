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

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jacky</span>
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
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              sodales velit eget mi volutpat, ut pulvinar erat ullamcorper. Sed
              vestibulum, nisi non commodo scelerisque, nulla metus convallis
              eros, at pharetra elit metus id arcu. Etiam eget mauris a est
              lobortis finibus et non tellus. Etiam sagittis nisi ut ante
              facilisis semper. Duis id nulla cursus, bibendum lacus sit amet,
              aliquam mi. Phasellus volutpat porta ante a aliquet. Praesent
              tristique velit a elementum eleifend. Sed malesuada blandit ipsum.
              Maecenas dapibus tempus semper. Nulla pretium fringilla
              ullamcorper
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              sodales velit eget mi volutpat, ut pulvinar erat ullamcorper. Sed
              vestibulum, nisi non commodo scelerisque, nulla metus convallis
              eros, at pharetra elit metus id arcu. Etiam eget mauris a est
              lobortis finibus et non tellus. Etiam sagittis nisi ut ante
              facilisis semper. Duis id nulla cursus, bibendum lacus sit amet,
              aliquam mi. Phasellus volutpat porta ante a aliquet. Praesent
              tristique velit a elementum eleifend. Sed malesuada blandit ipsum.
              Maecenas dapibus tempus semper. Nulla pretium fringilla
              ullamcorper
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img
              src="https://www.capcom-games.com/megaman/exe/assets/images/top/first-view_main.png"
              alt=""
            />
            <span>1 min ago</span>
          </div>
        </div>
      </div>
      <div ref={endRef}></div>
      <div className="bottom">
        <div className="icons">
          <ImageIcon fontSize="medium" />
          <CameraAltIcon fontSize="medium" />
          <MicIcon fontSize="medium" />
        </div>
        <input type="text" placeholder="Type a message" />
        <div className="emojis">
          <EmojiEmotionsIcon
            onClick={() => setOpen(!open)}
            className="emojiIcon"
          />
          <div className="emojiPicker">
            <EmojiPicker open={open} />
          </div>
        </div>
        <SendIcon className="sendBtn" fontSize="medium" />
      </div>
    </div>
  );
};

export default Chat;
