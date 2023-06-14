// SendDirectMessage.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../utilities/common_api';

interface IMessageData {
  message: string;
}

interface ICatData {
  _id: string;
  name: string;
}

const SendDirectMessage = ({ cat }: { cat: ICatData }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const messageData = { message };
      await axios.post(`${api.uri}/user/send-direct-message/${cat._id}?token=${token}`, messageData);
      alert('Direct message sent successfully');
      setMessage('');
    } catch (err) {
      console.error(err);
      alert('Error sending message');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Send direct message to {cat.name}</h2>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
      <button type="submit">Send Message</button>
    </form>
  );
};

export default SendDirectMessage;

