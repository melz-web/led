import React, { useCallback } from 'react';
import { useRemote } from '../remote.js';
import Switch from './Switch.jsx';

const OnSwitch = () => {
  const [on, setOn] = useRemote('on');
  return (<Switch type={'checkbox'} checked={on} onChange={setOn} />)
};

export default OnSwitch;
