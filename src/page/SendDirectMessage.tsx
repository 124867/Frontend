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

interface ISendDirectMessageProps {
  cat: ICatData;
  onMessageSent: () => void; // Define a function to be called when the message is sent successfully
}

const SendDirectMessage = ({ cat, onMessageSent }: ISendDirectMessageProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not logged in. Please log in to send direct messages.');
        window.location.href = '/login'; // Redirect the user to the login page
        return;
      }
      const messageData: IMessageData = { message };
      await axios.post(`${api.uri}/user/send-direct-message/${cat}?token=${token}`, messageData);
      alert('Direct message sent successfully');
      setMessage('');
      onMessageSent(); // Call the onMessageSent function passed as props
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
