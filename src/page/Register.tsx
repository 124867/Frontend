import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../utilities/common_api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Invalid email format');
      }
      /* if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
        throw new Error('Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one digit');
      } */
      const response = await axios.post(`${api.uri}/user/register`, { email, password });
      if (response.status === 200) {
        toast.success('User registered successfully.');
      }
      // Redirect to dashboard or home page  
    } catch (err) {
      console.error(err);
      // Display error message to user
      if (err.message === 'Invalid email format') {
        toast.error('Please enter a valid email address.');
      } /* else if (err.message === 'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one digit') {
      toast.error('Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one digit.');
    } */ else if (err.response && err.response.data) {
        toast.error(err.response.data);
      } else {
        toast.error('Oops! Something went wrong. Please try again later.');
      }
    }
  };



  return (
    <div className={styles.login}>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className={styles.loginChild} />
      <b className={styles.backToYour}>Sign Up</b>
      <div className={styles.chooseOneOf}>Choose one of the option to go</div>
      <div className={styles.loginItem} />
      <div className={styles.loginInner} />
      <div className={styles.getziontutorialcom}>
        <input
          type="email"
          placeholder="Enter your email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.email}>Email</div>
      <div className={styles.password}>
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.lineDiv} />
      <div className={styles.rectangleDiv} />
      <div className={styles.loginChild1} />
      <div className={styles.loginChild2} />
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <button className={styles.logIn} onClick={handleLogin}>Sign up</button>
      </div>
    </div>
  );
};

export default Register;
