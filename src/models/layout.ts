const initState = {
  // 接口返回的原始数据
  menuData: [],
  // 顶部菜单
  topMenu: [],
  // 侧边菜单数据
  sideMenu: [],
};

export default {
  namespace: 'layout',
  state: initState,
  effects: {
  },
  reducers: {
    /* 更新状态（通用） */
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
};
