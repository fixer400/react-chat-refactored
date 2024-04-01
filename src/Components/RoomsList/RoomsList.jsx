import React from "react";
import "./RoomsList.css";
import { useSelector } from "react-redux";

export default function RoomsList() {
  const roomsList = useSelector((state) => state.roomsList.rooms);
  return (
    <div className="rooms">
      <h2>Active Rooms</h2>
      <ul className="rooms__list">
        {roomsList.map((room) => {
          return <li key={room.roomName}>{room.roomName}</li>;
        })}
      </ul>
    </div>
  );
}
