import { Dropdown, Menu } from 'antd';
import React from 'react';
import styles from './index.less';
import people from './user.svg';

const menu = (
  <Menu theme="dark">
    <Menu.Item>退出登录</Menu.Item>
  </Menu>
);

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

const Avatar: React.FC<IProps> = (props) => {
  const { className = '', ...otherProps } = props;
  return (
    <Dropdown overlay={menu}>
      <div className={`${styles.root} ${className}`} {...otherProps}>
        <img alt="people" src={people} />
      </div>
    </Dropdown>
  );
};

export default Avatar;
