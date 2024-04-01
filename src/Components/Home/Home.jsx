/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth, setUserName } from "../../store/features/login/login";
import { setRoomName } from "../../store/features/roomData/roomData";
import socket from "../../socket";
import RoomsList from "../RoomsList/RoomsList";
import axios from "axios";
import { setRooms } from "../../store/features/roomsList/roomsList";

export default function Home() {
  const [validation, setValidation] = useState(true);
  const roomName = useSelector((state) => state.room.roomName);
  const userName = useSelector((state) => state.login.userName);
  const roomsList = useSelector((state) => state.roomsList.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_HOST_ADRESS + "/rooms")
      .then((res) => dispatch(setRooms(res.data)))
      .then(() => console.log(roomsList.length));
  }, []);

  function joinRoom(event) {
    event.preventDefault();
    if (userName && roomName) {
      socket.emit("join server", roomName);
      dispatch(setIsAuth(true));
      setValidation(true);
      socket.emit("set user", { userName, roomName });
    } else {
      setValidation(false);
    }
  }

  return (
    <div className="app">
      <div className="container">
        <form className="auth" onSubmit={joinRoom}>
          <h2>Room ID:</h2>
          <input
            type="number"
            maxLength="12"
            className={`auth__input ${!validation ? "error" : ""}`}
            value={roomName}
            onChange={(e) => dispatch(setRoomName(e.target.value))}
          />
          <h2>User Name:</h2>
          <input
            type="text"
            className={`auth__input ${!validation ? "error" : ""}`}
            maxLength="12"
            value={userName}
            onChange={(e) => dispatch(setUserName(e.target.value))}
          />
          <button onClick={joinRoom}>AUTH</button>
          {!validation && (
            <p className="auth__error-message">All fields are required</p>
          )}
        </form>
        {roomsList.length !== 0 && <RoomsList />}
      </div>
    </div>
  );
}
