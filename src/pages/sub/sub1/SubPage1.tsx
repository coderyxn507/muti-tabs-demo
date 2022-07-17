import { Input } from 'antd';
import React from 'react';
import { KeepAlive } from 'react-activation';
import styles from './SubPage1.less';

const SubPage1 = () => (
  <KeepAlive name="SubPage1" path="/sub/sub1" saveScrollPosition="screen">
    <div className={styles.root}>
      This is SubPage1 Test
      <Input />
    </div>
  </KeepAlive>
);

export default SubPage1;
