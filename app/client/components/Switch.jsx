import React, { useCallback } from 'react';
import selectors from './Switch.module.scss';

const Switch = ({ value, onChange }) => {
  const handleChange = useCallback((e) => onChange(e.currentTarget.checked), []);
  return (<input type={'checkbox'} className={selectors['switch']} checked={value} onChange={handleChange} />);
};

export default Switch;
