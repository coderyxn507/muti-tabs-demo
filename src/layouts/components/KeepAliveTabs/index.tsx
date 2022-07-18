import React, { useMemo } from 'react';
import { history } from 'umi';
import { useAliveController } from 'react-activation';

import Tab from './Tab';
import styles from './index.less';

export default function KeepAliveTabs() {
  const { getCachingNodes } = useAliveController();
  const cachingNodes = getCachingNodes();

  // 是否展示tab页签, 没有被缓存的就不展示tab
  const isShowTabs = useMemo(() => cachingNodes.some(i => i.path === history.location.pathname), [cachingNodes]);

  if (!isShowTabs) return null;

  return (
    <ul className={styles['alive-tabs']}>
      {cachingNodes.map((node, idx) => (
        <Tab key={idx} node={node} />
      ))}
    </ul>
  );
}
