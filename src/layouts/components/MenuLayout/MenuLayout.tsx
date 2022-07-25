import { Layout } from 'antd';
import React from 'react';
import Header from '../Header';
import KeepAliveTabs from '../KeepAliveTabs';
import { SideMenuData } from '../SideMenuLayout/CollapsibleSideMenu/SideMenu/SideMenu';
import Sider from '../Sider';
import styles from './MenuLayout.less';

const { Content } = Layout;

type MenuData = SideMenuData;

export interface MenuLayoutProps {
  menuData: MenuData[];
  children?: any;
}

const MenuLayout = (props: MenuLayoutProps) => {
  const { children, menuData } = props;

  return (
    <Layout className={styles.root}>
      <Header />
      <Layout>
        <Sider />
        <Content>
          <KeepAliveTabs />
          <div className={styles.tabWrapper}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MenuLayout;
