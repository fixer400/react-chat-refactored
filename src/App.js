import "./App.css";
import React from "react";
import Home from "./Components/Home/Home";
import { useSelector } from "react-redux";
import Chat from "./Components/Chat/Chat";

function App() {
  const isAuth = useSelector((state) => state.login.isAuth);
  return <div className="App">{!isAuth ? <Home /> : <Chat />}</div>;
}

export default App;
