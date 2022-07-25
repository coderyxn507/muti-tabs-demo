import { fetchMenuData } from '@/services/public';
import { Iconfont } from '@/components/Iconfont';
import { mockMenuData, mockMenuMap } from '../../mock/mockData';

const initState = {
  // 接口返回的原始数据
  menuData: [],
  // 顶部菜单
  topMenu: [],
  // 侧边菜单数据
  sideMenu: [],
  // 顶部菜单与侧边菜单的数据映射关系
  menuMap: {},
  // 处理后拍平 带路径的数据
  flatMenu: [],
  // 当前选中的顶部菜单key
  topMenuKey: '',
};

export default {
  namespace: 'layout',
  state: initState,
  effects: {
    *fetchMenuData({ payload }, { call, put }) {
      const res = yield call(fetchMenuData, payload);
      // 一级与二级菜单的映射
      const menuMap = mockMenuMap;
      // 顶部菜单数据
      const topMenu = Object.keys(menuMap).map(i => ({
        key: i,
        icon: Iconfont({ className: 'iconbanbenhuitui' }),
        label: i,
      }));
      // 默认选中一级菜单第一项
      const topMenuKey = topMenu?.[0]?.key;
      // 侧边(二级)菜单
      const sideMenu = mockMenuData.filter(i => menuMap[topMenuKey]?.includes?.(i.menuName)) || [];

      yield put({
        type: 'update',
        payload: {
          menuData: mockMenuData,
          topMenu,
          menuMap,
          sideMenu,
          topMenuKey,
        },
      });
    },
  },
  reducers: {
    /* 更新状态（通用） */
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),

    /** 更新顶部菜单选中值 */
    updateTopMenuKey: (state, { payload }) => ({
      ...state,
      topMenuKey: payload,
    }),

    /** 更新侧边栏菜单数据
     *  @params payload 值为topMaenuKey
     */
    updateSideMenu: (state, { payload }) => {
      const { menuData, topMenuKey, menuMap } = state;
      const sideMenu = menuData.filter(i => menuMap[payload || topMenuKey]?.includes?.(i.menuName));

      return {
        ...state,
        sideMenu,
      };
    },
  },
};
