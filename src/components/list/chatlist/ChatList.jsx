import "./chatList.css";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddUser from "./addUser/AddUser";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../lib/userStore";
import { db } from "../../../lib/firebase";
import { doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [inputText, setInputText] = useState("");
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data()?.chats || [];

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);
        console.log("chatData:" + chatData);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });
    console.log("userChats" + userChats);
    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );
    userChats[chatIndex].isSeen = true;

    const userChatRef = doc(db, "userchats", currentUser.id);
    try {
      await updateDoc(userChatRef, { chats: userChats });
    } catch (error) {
      concole.log(error);
    }
    changeChat(chat.chatId, chat.user);
  };

  const searchChats = chats.filter((chat) =>
    chat.user.username.toLowerCase().includes(inputText.toLowerCase())
  );

  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <SearchIcon className="icon" fontSize="large" />
          <input
            type="text"
            placeholder="Search"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <button className={addMode ? "add" : "minus"}>
          {addMode ? (
            <RemoveIcon
              fontSize="large"
              className="minus"
              onClick={() => setAddMode(!addMode)}
            />
          ) : (
            <AddIcon
              fontSize="large"
              className="add"
              onClick={() => setAddMode(!addMode)}
            />
          )}
        </button>
      </div>
      {searchChats.map((chat) => {
        return (
          <div
            className="item"
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
            style={{
              backgroundColor: chat.isSeen ? "transparent" : "#5183f2",
            }}
          >
            <img
              src={
                chat.user.block.includes(currentUser.id)
                  ? "./avatar.png"
                  : chat.user.avatar
              }
              alt=""
            />
            <div className="texts">
              <span>
                {chat.user.block.includes(currentUser.id)
                  ? "User"
                  : chat.user.username}
              </span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        );
      })}

      {addMode && <AddUser />}
    </div>
  );
};
export default ChatList;
