import React from 'react';
import { useHistory, useLocation } from 'umi';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useDropTab } from '@/hooks/useDropTab';

import styles from './index.less';

export default function Tab({ node }) {
  const history = useHistory();
  const location = useLocation();

  const closeTab = useDropTab();

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
      {
        node.name !== 'home' && (
          <CloseCircleOutlined
            className={styles['close-btn']}
            onClick={dropTab}
          />
        )
      }
    </li>
  );
}
