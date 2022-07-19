/** 通过keepAlive记录子组件状态，然后切换复原 */
import { Input } from 'antd';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

const StatePage = () => {
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    fetch('/api/testDate').then(r => r.json())
      .then((res) => {
        const { date } = res;
        setInputVal(moment(date).format('YYYY-MM-DD hh:mm:ss'));
      });
  }, []);

  return (
    <Input value={inputVal} />
  );
};

export default StatePage;
