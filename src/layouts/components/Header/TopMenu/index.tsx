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
  const { topMenu, topMenuKey, dispatch, className = '' } = props;


  // 暂时在这儿初始化 请求数据
  useEffect(() => {
    dispatch({
      type: 'layout/fetchMenuData',
    });
  }, []);

  // 选中事件
  const onClick = (e) => {
    dispatch({
      type: 'layout/updateTopMenuKey',
      payload: e.key,
    });
    dispatch({
      type: 'layout/updateSideMenu',
      payload: e.key,
    });
  };

  return (
    <div className={classNames(styles.root, className)}>
      <Menu
        theme="dark"
        selectedKeys={[topMenuKey]}
        mode="horizontal"
        items={topMenu}
        onClick={onClick}
      />
    </div>
  );
};

export default connect((state: ConnectState) => ({
  topMenu: state.layout.topMenu,
  topMenuKey: state.layout.topMenuKey,
}))(TopMenu);
