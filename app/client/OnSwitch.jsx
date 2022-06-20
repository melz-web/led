import React, { useCallback } from 'react';
import { useRemote } from './remote.js';

const OnSwitch = () => {
  const [on, setOn] = useRemote('on');
  const handleChange = useCallback((e) => setOn(e.currentTarget.checked), []);
  return (<input type={'checkbox'} checked={on} onChange={handleChange} />)
};

export default OnSwitch;
