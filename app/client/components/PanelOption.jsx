import React, { useCallback, useMemo } from 'react';

const PanelOption = ({ children, value, selected, onSelect }) => {
  const checked = useMemo(() => (selected === value), [selected, value]);
  const handleChange = useCallback((e) => onSelect(e.currentTarget.value), []);
  return (
    <label className={`btn btn-${(checked) ? '' : 'outline-'}light`}>
      <input type={'radio'} hidden value={value} checked={checked} onChange={handleChange} />
      {children}
    </label>
  );
};

export default PanelOption;