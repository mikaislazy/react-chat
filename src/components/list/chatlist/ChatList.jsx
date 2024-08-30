import "./chatList.css";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddUser from "./addUser/AddUser";
import { useState } from "react";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  console.log(`addmode: ${addMode}`);
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
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <h2>rock</h2>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <h2>rock</h2>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <h2>rock</h2>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <h2>rock</h2>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <h2>rock</h2>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <h2>rock</h2>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <h2>rock</h2>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <h2>rock</h2>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <h2>rock</h2>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <h2>rock</h2>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <h2>rock</h2>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <h2>rock</h2>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <h2>rock</h2>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <h2>rock</h2>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <h2>rock</h2>
          <p>Hello</p>
        </div>
      </div>
      {addMode && <AddUser />}
    </div>
  );
};
export default ChatList;
