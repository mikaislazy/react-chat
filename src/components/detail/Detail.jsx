import "./detail.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DownloadIcon from "@mui/icons-material/Download";
import BlockIcon from "@mui/icons-material/Block";
const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Jacky</h2>
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
        <button>Block User</button>
        <button className="logout">Log Out</button>
      </div>
    </div>
  );
};

export default Detail;
