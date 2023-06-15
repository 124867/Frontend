import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { api } from '../utilities/common_api';
import SendDirectMessage from './SendDirectMessage';
import jwt_decode from 'jwt-decode'

interface IMessageData {
  _id: string;
  catId: string;
  userId: {
    _id: string;
    email: string;
  },
  message: string;
  date: string;
}

interface ICatData {
  _id: string;
  image: string;
  name: string;
  age: number;
  breed: string;
  __v: number;
}

const CatInfo = ({ image, name, age, breed }: ICatData) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
    <img src={`${api.uri}/images/${image}`} alt={name} width="100" style={{ marginRight: '1rem' }} />
    <div>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{name}</p>
      <p style={{ marginBottom: '0.5rem' }}>Age: {age}</p>
      <p>Breed: {breed}</p>
    </div>
  </div>
);

const DirectMessage = ({ message, senderEmail, onDelete }: { message: string, senderEmail: string, onDelete: () => void }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1rem' }}>
    <div style={{ backgroundColor: '#eeeeee', borderRadius: '1rem', padding: '1rem', maxWidth: '80%' }}>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{message}</p>
      <sub>Sent by {senderEmail}</sub>
    </div>
    {onDelete && (
      <button onClick={onDelete}>Delete</button>
    )}
  </div>
);

const GetDirectMessagesForCat = ({ tokenRole }: { tokenRole: string }) => {
  const [messages, setMessages] = useState<IMessageData[]>([]);
  const [catData, setCatData] = useState<ICatData | null>(null);
  const { catId } = useParams<{ catId: string }>();
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.token;
  let role;
  if (token) {
    role = jwt_decode(token).role;
  } else {
    role = "user";
  }
  useEffect(() => {
    const fetchDirectMessages = async () => {
      try {
        const response = await axios.get(`${api.uri}/user/direct-messages/${catId}`);
        setMessages(response.data);
      } catch (err) {
        console.error(err);
        alert('Error retrieving direct messages');
      }
    };

    const fetchCatData = async () => {
      try {
        const response = await axios.get(`${api.uri}/cats/${catId}`);
        setCatData(response.data);
      } catch (err) {
        console.error(err);
        alert('Error retrieving cat data');
      }
    };

    fetchDirectMessages();
    fetchCatData();
  }, [catId]);

  const handleSuccess = () => {
    // Refetch direct messages after sending a new message
    const fetchDirectMessages = async () => {
      try {
        const response = await axios.get(`${api.uri}/user/direct-messages/${catId}`);
        setMessages(response.data);
      } catch (err) {
        console.error(err);
        alert('Error retrieving direct messages');
      }
    };
    fetchDirectMessages();
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${api.uri}/user/messages/${id}?token=${token}`);
      setMessages(messages.filter((message) => message._id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting message');
    }
  };

  if (!messages || !catData) {
    return null;
  }

  const { image, name, age, breed } = catData;

  return (
    <div>
      <CatInfo image={image} name={name} age={age} breed={breed} />
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column' }}>
        {messages.length > 0 ? (
          messages.map((message) => (
            <DirectMessage key={message._id} message={message.message} senderEmail={message.userId.email} onDelete={role === 'worker' ? () => handleDelete(message._id) : undefined} />
          ))
        ) : (
          <p>No direct messages yet for {name}</p>
        )}

        {role === 'public' ? null : (
          <SendDirectMessage cat={catId} onMessageSent={handleSuccess} />
        )}
      </div>
    </div>
  );
};

export default GetDirectMessagesForCat;
