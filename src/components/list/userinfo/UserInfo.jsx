import "./userinfo.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VideocamIcon from '@mui/icons-material/Videocam';
import EditIcon from '@mui/icons-material/Edit';

const UserInfo = () => {
    return(
        <div className='userInfo'>
            <div className="user">
                <img src="./avatar.png" alt="" />
                <h2>Mika Hung</h2>
            </div>
            <div className="icons">
            <MoreHorizIcon className="icon"/>
            <VideocamIcon className="icon"/>
            <EditIcon className="icon"/>
            </div>
        </div>
    )
}

export default UserInfo;