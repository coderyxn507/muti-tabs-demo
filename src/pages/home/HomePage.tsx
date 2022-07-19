import React from 'react';
import KeepAlive from 'react-activation';
import styles from './HomePage.less';

const HomePage = () => (
  <KeepAlive name="home" path="/home" saveScrollPosition="screen">
    <div className={styles.root}>This is New HomePage...</div>
  </KeepAlive>
);

export default HomePage;
