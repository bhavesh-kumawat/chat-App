/* eslint-disable react/prop-types */
import logo from "../assets/logo.jpg";
import userIcon from "../assets/userIcon.png";

const ChatWithBot = ({ message }) => {
  return (
    <div className="chat">
      {message.map((query) => (
        <div
          key={crypto.randomUUID()}
          className={query.isBot ? "answer" : "question"}
        >
          <img
            src={query.isBot ? logo : userIcon}
            alt={query.isBot ? "logo" : "userIcon"}
            className={query.isBot ? "logo__answer" : "user__Icon"}
          />

          {query.isBot ? (
            !query.text ? (
              <p className="shimmer-box "></p>
            ) : (
              <pre className="AI__Answer">{query.text}</pre>
            )
          ) : (
            <pre className="user__text">{query.text}</pre>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatWithBot;
