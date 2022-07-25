import { Iconfont } from '@/components/Iconfont';
import ConnectState from '@/models/connect.d';
import { MenuOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState, useMemo } from 'react';
import { connect } from 'umi';

import styles from './index.less';

const { Sider: ASider } = Layout;

type IProps = Record<string, any>;

const Sider = (props: IProps) => {
  const { sideMenu } = props;

  console.log(sideMenu);

  // 是否折叠侧边菜单
  const [collapsed, setCollapsed] = useState(false);
  // 二级与三级导航的映射

  const items = useMemo(() => sideMenu.map(i => ({
    key: i.rowId,
    icon: Iconfont({ className: 'icona-ziduan' }),
    label: i.menuName,
  })), [sideMenu]);

  return (
    <ASider
      className={styles.root}
      width={250}
      collapsed={collapsed}
      collapsedWidth={50}
    >
      <div>
        <MenuOutlined />
        收起
      </div>
      <Menu
        theme="dark"
        // selectedKeys={[topMenuKey]}
        items={items}
        mode="inline"
        // onClick={onClick}
      />
    </ASider>
  );
};

export default connect((state: ConnectState) => ({
  sideMenu: state.layout.sideMenu,
}))(Sider);
