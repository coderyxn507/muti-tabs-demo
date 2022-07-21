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
  // 处理后拍平 带路径的数据
  flatMenu: [],
};

export default {
  namespace: 'layout',
  state: initState,
  effects: {
    *fetchMenuData({ payload }, { call, put }) {
      const res = yield call(fetchMenuData, payload) || mockMenuData;
      // 一级与二级菜单的映射
      // 二级与三级菜单的映射
      yield put({
        type: 'update',
        payload: {
          topMenu: Object.keys(mockMenuMap).map(i => ({
            key: i,
            icon: Iconfont,
            label: i,
          })),
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
  },
};
