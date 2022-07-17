import { Button } from 'antd';
import React, { useState } from 'react';

const Counter = () => {
  const [state, setState] = useState(0);
  return (
    <>
      <Button onClick={() => { setState(state + 1); }}>counter</Button>
      <div>
        计数器数据为：
        {state}
      </div>
    </>
  );
};

export default Counter;
