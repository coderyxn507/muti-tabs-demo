import React from 'react';
import { useHistory, useLocation } from 'umi';
import { useAliveController } from 'react-activation';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useDropTab } from '@/utils/useDropTab';

import styles from './index.less';

export default function Tab({ node }) {
  const history = useHistory();
  const location = useLocation();

  const { getCachingNodes } = useAliveController();
  const closeTab = useDropTab();

  const cachingNodes = getCachingNodes();
  const closable = cachingNodes.length > 1;

  const dropTab = (e) => {
    e.stopPropagation();
    const currentName = node.name;

    closeTab(currentName);
  };

  return (
    <li
      className={location.pathname === node.path ? styles['active'] : ''}
      onClick={() => {
        history.push(node.path);
      }}
    >
      {node.path}
      {closable && (
        <CloseCircleOutlined
          className={styles['close-btn']}
          onClick={dropTab}
        />
      )}
    </li>
  );
}
