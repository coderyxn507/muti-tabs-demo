import { Menu } from 'antd';
import React, { useMemo } from 'react';
import styles from './index.less';

interface IProps {
  topMenu: any;
}
const TopMenu: React.FC<IProps> = (props) => {
  const { topMenu } = props;

  const MenuItems = useMemo(() => {
    return <div>11</div>
  }, []);

  return (
    <div className={styles.root}>
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="horizontal"
      >
        {MenuItems}
      </Menu>
    </div>
  );
};

export default TopMenu;
