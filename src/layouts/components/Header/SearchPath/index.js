import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { Input, Dropdown, Menu, Form } from 'antd';
import { debounce } from '@/utils/debounce';
import { _menus } from '../../../../../mock/mock_menu';

import styles from './index.less';

const { Search } = Input;

/**
 * 需求路径公共组件
 * @param {Function} getPathFun 外部获取路径的回调函数
 * @param form 上层表单实例
 * @param {boolean} isMustSelect 是否必选下面模糊匹配的选项，必须（true）则 在未选择的情况下 input框失焦会清空
 */
const SearchPath = (props) => {
  const { getPathFun, form, isMustSelect = false } = props;

  // 存储构建好的所有需求路径
  const [allPathData, setAllPathData] = useState([]);
  // 渲染的需求路径数据
  const [pathList, setPathList] = useState([]);
  // 当前选择的需求
  const [curPath, setCurPath] = useState(null);

  useEffect(() => {
    setAllPathData(flatTree(window?.top?._menus?.menus || _menus.menus || []));
  }, []);

  /**
   * @abstract 递归数据的方法
   * @param data 想要拍平的数据（只会保留叶子节点-叶子节点包含父节点们的数据）
   */
  const flatTree = useCallback((data, val = []) => data.reduce((arr, { children = [], ...rest }) => {
    if (children.length > 0) {
      return arr.concat(flatTree(children, [...val, { ...rest }]));
    }
    return arr.concat([{ ...rest, parentPath: val }]);
  }, []), []);

  // 渲染模糊查询的需求列表
  const menuUI = useMemo(
    () => (
      <Menu
        onClick={(e) => {
          menuSelect(e);
        }}
      >
        {pathList.map((item, index) => (
          <Menu.Item key={item.id}>
            <div className={styles.itemList} key={index}>
              <div className={styles.itemTitle}>{item.title}</div>
              <div style={{ display: 'flex' }}>
                {item.path.map((ele, i) => (
                  <div key={i}>
                    {i === item.path.length - 1 ? `${ele}` : `${ele}>`}
                  </div>
                ))}
              </div>
            </div>
          </Menu.Item>
        ))}
      </Menu>
    ),
    [pathList]
  );

  const menuSelect = (e) => {
    const obj = pathList.find(ele => ele.id === e.key);
    getPathFun(obj);
    setPathList([obj]);
    if (form && form.setFieldsValue) {
      form.setFieldsValue({
        searchPath: obj.text,
      });
      setCurPath(obj);
    }
  };

  /** 过滤数据 */
  const filterData = (searchVal, data) => {
    const newPathList = [];
    if (searchVal) {
      data.forEach((i) => {
        let isMatch = false;
        if (i.text.includes(searchVal)) {
          isMatch = true;
        } else {
          isMatch = i.parentPath.some(o => o.text.includes(searchVal));
        }
        if (isMatch) {
          newPathList.push({
            ...i,
            title: i.text,
            path: [...i.parentPath.map(o => o.text), i.text],
          });
        }
      });

      if (!isMustSelect) {
        form.setFieldsValue({
          path: searchVal,
        });
      }
    } else {
      form.setFieldsValue({
        searchPath: '',
        path: '',
      });
    }
    setPathList(newPathList);
    setCurPath(null);
  };

  /** 输入框变化回调函数 */
  const onChange = useRef(debounce(filterData, 500));

  /** 失焦后判断有无选择 是否必选 */
  const onVisibleChange = (e) => {
    // 是否选中列表节点
    const isSelectLi = e.relatedTarget && e.relatedTarget.tagName !== 'LI';
    if (isMustSelect && (!e.relatedTarget || isSelectLi) && (!curPath || pathList.length === 0)) {
      form.setFieldsValue({
        searchPath: '',
        path: '',
      });
      setPathList([]);
      setCurPath(null);
    }
  };

  return (
    <Dropdown
      overlay={menuUI}
      overlayClassName={styles.searchPath}
      // onVisibleChange={onVisibleChange}
    >
      <Form.Item name="searchPath">
        <Search
          placeholder="请输入您要搜索的内容"
          allowClear
          autoComplete="off"
          onChange={e => onChange.current(e.target.value, allPathData)}
          onBlur={onVisibleChange}
        />
      </Form.Item>
    </Dropdown>
  );
};

export default SearchPath;
