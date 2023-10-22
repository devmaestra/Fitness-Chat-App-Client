import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Input, Form, FormGroup } from 'reactstrap';
import { baseURL } from '../environments/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';

const ConversationsTable = (props) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessageText, setNewMessageText] = useState('');
  const [userData, setUserData] = useState(null);
  const [refreshConversations, setRefreshConversations] = useState(false);

  const [errorModalOpen, setErrorModalOpen] = useState(false);
const [errorModalMessage, setErrorModalMessage] = useState('');


  const textRef = useRef();

  const handleDelete = async (conversationId) => {
    // Make an API request to delete the conversation with the specified ID
    const url = `${baseURL}/conversation/${conversationId}`;
    const headers = new Headers();
    headers.append('Authorization', props.token);
  
    const requestOptions = {
      headers,
      method: 'DELETE',
    };
  
    try {
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
  
      if (response.status === 200) {
        console.log('Conversation deleted:', responseData.message);
        setRefreshConversations(true); // Refresh the conversations
      } else {
        console.error('Error deleting conversation:', responseData.message);
  
        // Check if the error message indicates the user is not the owner
        if (responseData.message === "No conversation in collection!") {
          setErrorModalMessage("You must be the owner of the Convo to Delete it.");
          setErrorModalOpen(true);
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  
  
  const openErrorModal = (errorMessage) => {
    setErrorModalMessage(errorMessage);
    setErrorModalOpen(true);
  };  

  useEffect(() => {
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
          setConversations(data.getAllConversations || []);
          setRefreshConversations(false); // Reset it to false after refreshing
        }
      } catch (err) {
        console.error('Error fetching conversations:', err.message);
      }
    }

    fetchConversations();
  }, [props.token, refreshConversations]); // Add refreshConversations to the dependencies

  useEffect(() => {
    async function fetchUserData() {
      const url = `${baseURL}/user/loggeduser`;
  
      let requestOption = {
        headers: new Headers({
          Authorization: props.token,
        }),
        method: 'GET',
      };
      
      try {
        let res = await fetch(url, requestOption);
      
        if (!res.ok) {
          throw new Error(`Failed to fetch user data. Status: ${res.status}, Response: ${await res.text()}`);
        }
      
        let data = await res.json();
        console.log(data);
      
        if (data) {
          setUserData(data);
        }
      } catch (err) {
        console.error('Error fetching user data:', err.message);
      }
    }
  
    // Call the function here, not inside itself
    fetchUserData();
  }, [props.token]);
  

  const openModal = (conversation) => {
    setSelectedConversation(conversation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedConversation(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = textRef.current.value;

    if (!selectedConversation) {
      console.error('No conversation selected.');
      return;
    }

    const data = {
      text,
      owner_Id: userData._id.toString(),
      username: userData.username,
      target_Id: selectedConversation.target_Id,
      targetUsername: selectedConversation.targetUsername,
      conversation_Id: selectedConversation._id,
    };

    let url = `${baseURL}/message/`;

    let headers = new Headers();
    headers.append(`Content-Type`, `application/json`);
    headers.append('Authorization', props.token);

    const requestOption = {
      headers,
      body: JSON.stringify(data),
      method: 'POST',
    };

    try {
      const res = await fetch(url, requestOption);
      const responseData = await res.json();

      if (res.status !== 200) {
        console.error('Error:', responseData.error);
      } else {
        console.log('Message sent successfully:', responseData);
        textRef.current.value = '';
        setNewMessageText('');
        setRefreshConversations(true);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <Table>
        <tbody>
          {conversations.map((conversation) => (
            <tr key={conversation._id}>
              <td>
                <Button
                  color="primary"
                  onClick={() => openModal(conversation)}
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
              <td>
                <Button
                  color="danger"
                  onClick={() => handleDelete(conversation._id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={isModalOpen} toggle={closeModal}>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <div className="modal-header">
              <h5 className="modal-title">{selectedConversation ? selectedConversation.title : 'No conversation selected.'}</h5>
              <button type="button" className="close" onClick={closeModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {selectedConversation ? (
                <>
                  <h6>Messages:</h6>
                  <ul>
                    {selectedConversation.messages.map((message) => (
                      <li key={message._id}>
                        <strong>{message.username}:</strong> {message.text}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                'No conversation selected.'
              )}
            </div>
            <Input
              innerRef={textRef}
              placeholder="Enter text"
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <Button color="primary" style={{ width: '75px' }}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
            <div className="modal-footer"></div>
          </FormGroup>
        </Form>
      </Modal>

      <Modal isOpen={errorModalOpen} toggle={() => setErrorModalOpen(false)}>
  <div className="modal-body">
    {errorModalMessage}
  </div>
  <div className="modal-footer">
    <Button color="danger" onClick={() => setErrorModalOpen(false)}>OK</Button>
  </div>
</Modal>


    </div>
  );
};

export default ConversationsTable;
