import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  function handleAvatar(e) {
    if (e.target.files[0]) {
      setAvatar({
        file: null,
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }
  function handleLogin(e) {
    e.preventDefault();
    toast.warn("Hello");
  }
  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back, </h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="text" placeholder="Password" name="password" />
          <button>Sign In</button>
        </form>
      </div>
      <div className="seperator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form action="">
          <label htmlFor="file">
            <img src={avatar?.url || " ./avatar.png"} alt="" />
            Upload an image
            <input
              type="file"
              id="file"
              style={{ display: "none " }}
              onChange={handleAvatar}
            />
          </label>
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="text" placeholder="Password" name="password" />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};
export default Login;
