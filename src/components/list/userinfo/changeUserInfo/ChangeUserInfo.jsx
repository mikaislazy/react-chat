import { useUserStore } from "../../../../lib/userStore";
import "./changeUserInfo.css";
import EditIcon from "@mui/icons-material/Edit";
import upload from "../../../../lib/upload/upload";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { useState, useEffect } from "react";
import { Input } from "@mui/material";
const ChangeUserInfo = () => {
  const { currentUser } = useUserStore();
  const [icon, setIcon] = useState({ file: null, url: "" });
  const [quote, setQuote] = useState("");
  const [editQuote, setEditQuote] = useState(false);
  console.log(JSON.stringify(icon));

  const handleChangeIcon = async (e) => {
    if (e.target?.files[0]) {
      setIcon({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleUploadIcon = async () => {
    if (!icon.file) return;
    try {
      const imgUrl = await upload(icon.file);
      await updateDoc(doc(db, "users", currentUser.id), {
        avatar: imgUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleQuote = async () => {
    if (!editQuote || quote === "") {
      setEditQuote(!editQuote);
      return;
    }
    try {
      await updateDoc(doc(db, "users", currentUser.id), {
        quote,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEditQuote(!editQuote);
      setQuote("");
    }
  };
  return (
    <div className="changeUserInfo">
      <div className="user">
        <div className="detail">
          <label htmlFor="file">
            <img
              src={icon.url || currentUser.avatar || "./avatar.png"}
              alt=""
            />
            <input
              type="file"
              id="file"
              style={{ display: "none " }}
              onChange={handleChangeIcon}
            />
          </label>
          <span>{currentUser.username}</span>
        </div>
        <div className="uploadIcon">
          <button onClick={handleUploadIcon}>Change Icon</button>
        </div>
      </div>
      <div className="quote">
        {editQuote ? (
          <input
            type="text"
            value={quote}
            onChange={(e) => {
              setQuote(e.target.value);
            }}
          />
        ) : (
          <p>{currentUser.quote}</p>
        )}
        <EditIcon onClick={handleQuote} className="icon" fontSize="medium" />
      </div>
    </div>
  );
};

export default ChangeUserInfo;
