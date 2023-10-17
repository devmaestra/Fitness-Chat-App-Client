import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Input, Form, FormGroup } from 'reactstrap';
import { baseURL } from '../environments/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ConversationsTable = (props) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessageText, setNewMessageText] = useState('');
  const [userData, setUserData] = useState(null);
  const [refreshConversations, setRefreshConversations] = useState(false);

  const textRef = useRef();

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
        setNewMessageText(''); // Clear the form
        setRefreshConversations(true); // Set this to true to trigger a refresh
        setIsModalOpen(false); // Close the modal
      }
    } catch (err) {
      console.error(err.message);
    }
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
    </div>
  );
};

export default ConversationsTable;
