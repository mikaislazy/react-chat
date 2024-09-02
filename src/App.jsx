import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { useEffect } from "react";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const user = true;
  // useEffect(() => {
  //   const unSub = onAuthStateChanged(auth, (user) => {
  //     console.log(user);
  //   });

  //   return () => {
  //     unSub();
  //   };
  // }, []);
  return (
    <div className="container">
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
