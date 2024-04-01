import { useState } from "react";
import { useSelector } from "react-redux";
import socket from "../../socket";

export default function TextSendForm() {
  const userName = useSelector((state) => state.login.userName);

  const [text, setText] = useState("");
  function sendMessage(event) {
    event.preventDefault();
    socket.emit("send message", { userName: userName, message: text });
  }

  function handleChange(event) {
    setText(event.target.value);
  }

  return (
    <form className="chat__action" onSubmit={(event) => sendMessage(event)}>
      <input
        type="text"
        maxLength="200"
        className="chat__input"
        onChange={handleChange}
        value={text}
      />
      <button type="submit">SEND</button>
    </form>
  );
}
