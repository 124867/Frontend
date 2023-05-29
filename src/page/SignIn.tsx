import React, { FunctionComponent } from 'react';
import styles from './Login.module.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Login: FunctionComponent = () => {
  return (
    <div className={styles.login}>
      <div className={styles.loginChild} />
      <b className={styles.backToYour}>Sign In</b>
      <div className={styles.chooseOneOf}>Choose one of the option to go</div>
      <div className={styles.loginItem} />
      <div className={styles.loginInner} />
      <div className={styles.getziontutorialcom}>
        <span className={styles.get}>get</span>
        <span className={styles.span}>@</span>
        <span className={styles.ziontutorialcom}>ziontutorial.com</span>
      </div>
      <div className={styles.password}>Password</div>
      <div className={styles.orContinueWith}>Or continue with <Link to="/Register">Register</Link></div>
      <div className={styles.lineDiv} />
      <div className={styles.rectangleDiv} />
      <div className={styles.loginChild1} />
      <div className={styles.loginChild2} />
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.logIn}>Log in</div>
      </div>
    </div>
  );
};

export default Login;