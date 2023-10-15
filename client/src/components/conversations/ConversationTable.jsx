import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input } from 'reactstrap'; // Import Modal
import { baseURL } from '../environments/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ConversationsTable = (props) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null); // Store the selected conversation
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [newConversationText, setNewConversationText] = useState('');

  useEffect(() => {
    // Fetch conversations when the component mounts
    async function fetchConversations() {
      const url = `${baseURL}/conversation/myconversations`;

      let requestOption = {
        headers: new Headers({
          Authorization: props.token,
        }),
        method: 'GET',
      };

      try {
        let res = await fetch(url, requestOption);

        if (!res.ok) {
          throw new Error(`Failed to fetch conversations. Status: ${res.status}, Response: ${await res.text()}`);
        }

        let data = await res.json();
        console.log(data);

        if (data) {
          setConversations(data.getAllConversations || []); // Update local state with fetched conversations
        }
      } catch (err) {
        console.error('Error fetching conversations:', err.message);
      }
    }

    fetchConversations(); // Call the function inside useEffect

  }, [props.token]); // Include props.token in the dependency array

  // Function to handle opening the modal with the conversation title
  const openModal = (conversation) => {
    setSelectedConversation(conversation); // Set the selected conversation
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedConversation(null); // Clear the selected conversation
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <Table>
        {/* ... (your table headers) */}
        <tbody>
          {conversations.map((conversation) => (
            <tr key={conversation._id}>
              <td>
                <Button
                  color="primary"
                  onClick={() => openModal(conversation)} // Open modal when the button is clicked
                >
                  Open Convo
                </Button>
              </td>
              <td>{conversation.title}</td>
              <td>
                {conversation.messages && conversation.messages.length > 0
                  ? conversation.messages[conversation.messages.length - 1].text
                  : 'No messages'}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal isOpen={isModalOpen} toggle={closeModal}>
        <div className="modal-header">
          <h5 className="modal-title">{selectedConversation ? selectedConversation.title : 'No conversation selected.'}</h5>
          <button type="button" className="close" onClick={closeModal}>
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {selectedConversation ? (
            <>
              {/* Display messages inside the modal */}
              <h6>Messages:</h6>
              <ul>
                {selectedConversation.messages.map((message) => (
                  <li key={message._id}>
                    <strong>{message.username}:</strong> {message.text}</li>
                ))}
              </ul>
            </>
          ) : (
            'No conversation selected.'
          )}
        </div>
        <Input
        placeholder="Enter text"
        value={newConversationText}
        onChange={(e) => setNewConversationText(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      {/* onClick={handleSendClick} would go below in this button*/}
      <Button color="primary" style={{ width: '75px' }} >
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
        <div className="modal-footer">
        </div>
      </Modal>
    </div>
  );
};

export default ConversationsTable;
