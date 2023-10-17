const MessageList = ({ messages }) => {
    return (
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <p>{message.text}</p>
            <small>{message.date}</small>
          </div>
        ))}
      </div>
    );
  };