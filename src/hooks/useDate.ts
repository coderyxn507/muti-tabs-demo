import moment from 'moment';
import { useEffect, useState } from 'react';

/** 防止凌晨日期增加问题 */
export const useDate = () => {
  // '2022-7-21 23:59:58' 测试数据
  const [startTime, setStartTime] = useState(moment());

  useEffect(() => {
    const endTime = moment().add(1, 'days')
      .startOf('day');
    const time = moment(endTime).diff(startTime, 'seconds');

    const timeId = setTimeout(() => {
      // '2022-7-23 23:59:58'
      setStartTime(moment());
    }, time * 1000);

    return () => { clearTimeout(timeId); };
  }, [startTime]);

  return startTime.format('YYYY-MM-DD');
};
