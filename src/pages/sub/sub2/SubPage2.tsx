import React from 'react';
import { KeepAlive } from 'react-activation';
import styles from './SubPage2.less';

const SubPage2 = () => (
  <KeepAlive name="SubPage2" path="/sub/sub2" saveScrollPosition="screen">
    <div className={styles.root}>
      This is SubPage2
    </div>
  </KeepAlive>
);

export default SubPage2;
