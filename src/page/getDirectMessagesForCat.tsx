import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { api } from '../utilities/common_api';

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

const DirectMessage = ({ message, senderEmail }: { message: string, senderEmail: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1rem' }}>
    <div style={{ backgroundColor: '#eeeeee', borderRadius: '1rem', padding: '1rem', maxWidth: '80%' }}>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{message}</p>
      <sub>Sent by {senderEmail}</sub>
    </div>
  </div>
);

const GetDirectMessagesForCat = () => {
  const [messages, setMessages] = useState<IMessageData[]>([]);
  const [catData, setCatData] = useState<ICatData | null>(null);
  const { catId } = useParams<{ catId: string }>();

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
            <DirectMessage key={message._id} message={message.message} senderEmail={message.userId.email} />
          ))
        ) : (
          <p>No direct messages yet for {name}</p>
        )}
        <button style={{ alignSelf: 'center', marginTop: '2rem', padding: '0.5rem 1rem', backgroundColor: 'blue', color: 'white', borderRadius: '1rem', border: 'none' }}>New Direct Message</button>
      </div>
    </div>
  );
};

export default GetDirectMessagesForCat;
