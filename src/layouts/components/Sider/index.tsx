/* eslint-disable react/jsx-key */
import { Iconfont } from '@/components/Iconfont';
import ConnectState from '@/models/connect.d';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Popover } from 'antd';
import React, { useState, useMemo, useRef } from 'react';
import { connect, history } from 'umi';

import styles from './index.less';

const { Sider: ASider } = Layout;

type Obj = Record<string, any>;

type IProps = Obj;

/** 生成三级菜单数据 */
const buildLeafMenu = (arr) => {
  const leafMenu: Obj[] = [];
  let curIdx = -1;
  // 把数据分组
  arr?.forEach?.((i) => {
    if (i.startProgram === '#') {
      leafMenu.push({
        ...i,
        children: [],
      });
      curIdx += 1;
    } else {
      leafMenu[curIdx]?.children?.push(i);
    }
  });
  return leafMenu;
};

/**
 * 侧边栏
 * @param props
 * @returns
 */
const Sider = (props: IProps) => {
  const { sideMenu } = props;

  // 根节点ref
  const rootRef = useRef(null);

  // 是否折叠侧边菜单
  const [collapsed, setCollapsed] = useState(false);
  // 是否展示三级菜单
  const [isShow, setIsShow] = useState(false);
  // 三级导航数据
  const [leafMenu, setLeafMenu] = useState<Obj[]>([]);

  /** 二级菜单数据 */
  const items = useMemo(
    () =>
      sideMenu.map(i => ({
        key: i.rowId,
        icon: Iconfont({ className: 'icona-ziduan', title: i.menuName }),
        label: i.menuName,
        title: null,
        onMouseOver: (e) => {
          setIsShow(true);
          setLeafMenu(buildLeafMenu(i.children));
        },
      })),
    [sideMenu],
  );

  /** 三级菜单UI */
  const leafMenuUI = useMemo(
    () =>
      leafMenu.map((i, idx) => {
        const tags = i.children.map(item => (
          <div
            onClick={() => {
              history.push({ pathname: `/${item.startProgram}` });
            }}
            key={item.rowId}
          >
            {item.menuName}
          </div>
        ));
        return (
          <div className={styles.leafItem}>
            <div className={styles.leafTitle}>{i.menuName}</div>
            <div className={styles.leafCtn}>{tags}</div>
          </div>
        );
      }),
    [leafMenu],
  );

  const controlUI = useMemo(() => {
    const click = () => {
      setCollapsed(!collapsed);
    };
    if (collapsed) {
      return <MenuUnfoldOutlined onClick={click} />;
    }
    return (
      <div onClick={click}>
        <MenuFoldOutlined />
        展开
      </div>
    );
  }, [collapsed]);

  return (
    <ASider
      className={styles.root}
      width={250}
      collapsed={collapsed}
      collapsedWidth={50}
      ref={rootRef}
    >
      <div className={styles.controlZone}>{controlUI}</div>
      <Popover
        visible={isShow}
        placement="right"
        getPopupContainer={() => rootRef.current}
        overlayClassName={styles.suspensionMenu}
        zIndex={500}
        content={leafMenuUI}
        onVisibleChange={(vis) => {
          // setIsShow(vis);
        }}
      >
        <Menu theme="dark" items={items} mode="inline" />
      </Popover>
    </ASider>
  );
};

export default connect((state: ConnectState) => ({
  sideMenu: state.layout.sideMenu,
}))(Sider);
