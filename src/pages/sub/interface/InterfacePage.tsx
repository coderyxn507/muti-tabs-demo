import React from 'react';
import { KeepAlive } from 'react-activation';
import styles from './InterfacePage.less';
import StatePage from './StatePage';

const InterfacePage = () => (
  <KeepAlive name="InterfacePage" path="/sub/interface" saveScrollPosition="screen">
    <div className={styles.root}>
      This is InterfacePage Test, 获取接口的日期为：
      <StatePage />
    </div>
  </KeepAlive>
);

export default InterfacePage;
