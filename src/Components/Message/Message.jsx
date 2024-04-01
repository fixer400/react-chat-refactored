export default function Message({ userName, messageText }) {
  console.log(userName, messageText);
  return (
    <div className="message">
      <h3 className="message__user-name">{userName}:</h3>
      <p className="message__text">{messageText}</p>
    </div>
  );
}
