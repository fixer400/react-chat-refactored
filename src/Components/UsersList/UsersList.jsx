import { useEffect } from "react";
import socket from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../store/features/roomData/roomData";

export default function UsersList() {
  const users = useSelector((state) => state.room.users);
  console.log(users);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("get users", (users) => {
      dispatch(setUsers(users));
    });
  }, []);

  return (
    <div className="users">
      <h2>Users</h2>
      <ul className="users__list">
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </div>
  );
}
