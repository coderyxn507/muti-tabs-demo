/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAliveController } from 'react-activation';
import { history } from 'umi';

/**
 * 关闭指定tab, 跳转到指定tab, 未指定则当关闭自身时跳当前node的第一个tab
 * @param dropName 指定tab的name
 * @param path 跳转的path
 */
export const useDropTab = () => {
  const { getCachingNodes, dropScope } = useAliveController();
  return (dropName, path?) => {
    const cachingNodes = getCachingNodes();
    let isCloseSelf = false;
    if (dropName) {
      dropScope(dropName);

      const goPath =
        path ||
        cachingNodes
          .filter((i) => {
            if (history.location.pathname === i.path && i.name === dropName) isCloseSelf = true;
            return i.name !== dropName;
          })
          .shift().path;

      if (isCloseSelf) {
        history.push(goPath);
      }
    }
  };
};
