import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import { baseURL } from '../environments/index';

const ConversationsTable = (props) => {
  const [conversations, setConversations] = useState([]);

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
          setConversations(data.getAllConversations || []); // Update local state with fetched conversations
        }
      } catch (err) {
        console.error('Error fetching conversations:', err.message);
      }
    }

    fetchConversations(); // Call the function inside useEffect

  }, [props.token]); // Include props.token in the dependency array

  return (
    <Table>
       <thead>
        <tr>
          <th>Title</th>
          <th>Message Text</th>
          {/* Add more headers if needed */}
        </tr>
      </thead>
      <tbody>
        {conversations.map(conversation => (
          <tr key={conversation._id}>
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
  );
};

export default ConversationsTable;