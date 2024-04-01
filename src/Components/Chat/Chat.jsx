import { useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "../../socket";
import TextSendForm from "../TextSendForm/TextSendForm";
import UsersList from "../UsersList/UsersList";
import MessagesField from "../MessagesField/MessagesField";
import "./Chat.css";

export default function Chat() {
  const roomName = useSelector((state) => state.room.roomName);
  const userName = useSelector((state) => state.login.userName);

  useEffect(() => {
    subscribeSockets;
  }, []);

  function subscribeSockets() {
    // socket.on('new message', () => {new Audio('/Bruh.mp3').play()})
    socket.on("new user", () => {
      new Audio("/discord-sounds.mp3").play();
    });
  }

  return (
    <div className="chat">
      <div className="chat__users">
        <h2>Room:{roomName}</h2>
        <h2>{userName}</h2>
        <UsersList />
      </div>
      <div className="chat__main">
        <MessagesField />
        <TextSendForm />
      </div>
    </div>
  );
}
