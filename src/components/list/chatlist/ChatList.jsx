import "./chatList.css";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddUser from "./addUser/AddUser";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../lib/userStore";
import { db } from "../../../lib/firebase";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
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

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  const handleSelect = async (chat) => {
    console.log(chat);

    changeChat(chat.chatId, chat.user);
  };
  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <SearchIcon className="icon" fontSize="large" />
          <input type="text" placeholder="Search" />
        </div>
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
      </div>
      {chats.map((chat) => {
        return (
          <div
            className="item"
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
          >
            <img src={chat.user.avatar || "./avatar.png"} alt="" />
            <div className="texts">
              <h2>{chat.user.username}</h2>
              <p>{chat.user.lastMessage}</p>
            </div>
          </div>
        );
      })}

      {addMode && <AddUser />}
    </div>
  );
};
export default ChatList;
