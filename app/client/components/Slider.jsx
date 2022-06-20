import React, { useCallback } from 'react';
import selectors from './Slider.module.scss';

const Slider = ({ value, onChange, ...props }) => {
  const handleChange = useCallback((e) => onChange(parseInt(e.currentTarget.value)), []);
  return (<input {...props} type={'range'} className={selectors['slider']} value={value} onChange={handleChange} />);
};

export default Slider;
