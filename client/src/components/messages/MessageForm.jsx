import React, { useState } from 'react';

function MessageForm({ conversationId, targetUserId, onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // Create a message object with the text and other necessary data
    const newMessage = {
      text: message,
      conversation_Id: conversationId,
      target_Id: targetUserId,
    };

    // Call the onSendMessage callback with the new message
    onSendMessage(newMessage);

    // Clear the message input field
    setMessage('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default MessageForm;
