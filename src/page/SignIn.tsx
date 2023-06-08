import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Invalid email format');
      }
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
        throw new Error('Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one digit');
      }
      const response = await axios.post('/login', { email, password });
      // Redirect to dashboard or home page
    } catch (err) {
      console.error(err);
      // Display error message to user
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginChild} />
      <b className={styles.backToYour}>Sign In</b>
      <div className={styles.chooseOneOf}>Choose one of the option to go</div>
      <div className={styles.loginItem} />
      <div className={styles.loginInner} />
      <div className={styles.getziontutorialcom}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.email}>Email</div>
      <div className={styles.password}>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.orContinueWith}>Or continue with <Link to="/register">Register</Link></div>
      <div className={styles.lineDiv} />
      <div className={styles.rectangleDiv} />
      <div className={styles.loginChild1} />
      <div className={styles.loginChild2} />
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <button className={styles.logIn} onClick={handleLogin}>Log in</button>
      </div>
    </div>
  );
};

export default Login;