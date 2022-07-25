import { Button, Input } from 'antd';
import { history } from 'umi';
import React from 'react';
import { KeepAlive } from 'react-activation';
import { useDropTab } from '@/hooks/useDropTab';
import styles from './SubPage1.less';

const SubPage1 = () => {
  const closeTab = useDropTab();

  return (
    <KeepAlive name="SubPage1" path="/sub/sub1" saveScrollPosition="screen">
      <div className={styles.root}>
        This is SubPage1 Test
        <Input />
        <Button onClick={() => {
          history.push({ pathname: '/independent' });
        }}
        >
          点击按钮打开一个页签
        </Button>
        <br />
        <Button onClick={() => {
          closeTab('SubPage1');
        }}
        >
          点击按钮关闭【自己】
        </Button>
        <br />
        <Button onClick={() => {
          closeTab('IndependentPage');
        }}
        >
          点击按钮关闭【指定】页签
        </Button>
      </div>
    </KeepAlive>
  );
};

export default SubPage1;
