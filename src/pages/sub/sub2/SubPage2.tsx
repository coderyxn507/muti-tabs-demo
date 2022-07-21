import React from 'react';
import { KeepAlive } from 'react-activation';
import styles from './SubPage2.less';
import Counter from './Counter';

const SubPage2 = () => (
  <KeepAlive name="SubPage2" path="/sub/sub2" saveScrollPosition="screen">
    <div className={styles.root}>
      This is SubPage2
      <Counter />
      {Array(100)
        .fill('')
        .map((item, idx) => (
          <div key={idx}>
            测11试滚动条位置
            {' '}
            {idx + 1}
          </div>
        ))}
    </div>
  </KeepAlive>
);

export default SubPage2;
