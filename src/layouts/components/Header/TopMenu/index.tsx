import ConnectState from '@/models/connect.d';
import { Menu } from 'antd';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { connect } from 'umi';
import styles from './index.less';

interface IProps {
  topMenu: any;
  className?: string;
  [key: string]: any;
}
const TopMenu: React.FC<IProps> = (props) => {
  const { topMenu, dispatch, className = '' } = props;

  // 暂时在这儿初始化 请求数据
  useEffect(() => {
    dispatch({
      type: 'layout/fetchMenuData',
    });
  }, []);

  return (
    <div className={classNames(styles.root, className)}>
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="horizontal"
        items={topMenu}
      />
    </div>
  );
};

export default connect((state: ConnectState) => ({
  topMenu: state.layout.topMenu,
}))(TopMenu);
