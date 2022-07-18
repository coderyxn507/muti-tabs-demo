import { Input } from 'antd';
import React from 'react';
import { KeepAlive } from 'react-activation';
import styles from './IndependentPage.less';

const IndependentPage = () => (
  <KeepAlive name="IndependentPage" path="/independent" saveScrollPosition="screen">
    <div className={styles.root}>
      这是一个独立的，不在导航中的page
      <Input />
    </div>
  </KeepAlive>
);

export default IndependentPage;
