import { Layout } from 'antd';
import React, { useMemo, useState } from 'react';
import src from '@/assets/img/arafes.png';
import moment from 'moment';
import { useDate } from '@/hooks/useDate';
import Avatar from './Avatar';
import TopMenu from './TopMenu';

import styles from './index.less';

const { Header: AHeader } = Layout;

interface IProps {
  topMenu: any;
}

const Header: React.FC<IProps> = (props) => {
  const { topMenu } = props;

  const date = useDate();

  return (
    <AHeader className={styles.root}>
      <div className={styles.leftZone}>
        <img alt="logo" src={src} />
        <span>MultiTabs侵删</span>
      </div>
      {/* <TopMenu /> */}
      <div className={styles.rightZone}>
        <span>{date}</span>
        <Avatar />
      </div>
    </AHeader>
  );
};

export default Header;

