import React from 'react';
import { FileOutlined, HomeOutlined, ToolOutlined } from '@ant-design/icons';

export default [
  {
    key: '/home',
    icon: <HomeOutlined />,
    text: '首页',
  },
  {
    key: '/sub',
    icon: <ToolOutlined />,
    text: '子页面',
    children: [
      {
        key: '/sub/sub1',
        text: '子页面1',
      },
      {
        key: '/sub/sub2',
        text: '子页面2',
      },
      {
        key: '/sub/interface',
        text: 'useEffect中测试接口页面',
      },
    ],
  },
];
