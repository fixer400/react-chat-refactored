import { useDispatch, useSelector } from "react-redux";
import Message from "../Message/Message";
import axios from "axios";
import { useEffect } from "react";
import socket from "../../socket";
import { setMessages } from "../../store/features/roomData/roomData";

export default function MessagesField() {
  const messages = useSelector((state) => state.room.messages);
  const roomName = useSelector((state) => state.room.roomName);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("get messages", getMessages);
    getMessages();
  }, []);
  function getMessages() {
    axios
      .get(process.env.REACT_APP_HOST_ADRESS + "/messages/" + roomName)
      .then((response) => {
        dispatch(setMessages(response.data));
      });
  }

  return (
    <div className="chat__messages">
      {messages.map((el, key) => {
        return (
          <Message key={key} messageText={el.message} userName={el.userName} />
        );
      })}
    </div>
  );
}
