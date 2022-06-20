import React, { useMemo, useState } from 'react';
import { useRemote } from '../remote.js'
import gradients from '../util/gradients.js';
import PanelOption from './PanelOption.jsx';
import Slider from './Slider.jsx';
import Switch from './Switch.jsx';

const ControlPanel = () => {
  const [panel, setPanel] = useState('on');

  const [on, setOn] = useRemote('on');
  const [hue, setHue] = useRemote('hue');
  const [saturation, setSaturation] = useRemote('saturation');
  const [value, setValue] = useRemote('value');

  const hueStyle = useMemo(() => ({
    backgroundImage: gradients.hue()
  }), []);

  const saturationStyle = useMemo(() => ({
    backgroundImage: gradients.saturation((hue / 255) * 360)
  }), [hue]);

  const valueStyle = useMemo(() => ({
    backgroundImage: gradients.value((hue / 255) * 360, (saturation / 255) * 100)
  }), [hue, saturation]);

  return (
    <div className={'w-100 h-100 d-flex flex-column align-items-stretch'}>
      <header className={'d-flex flex-row justify-content-center p-3 gap-3'}>
        <PanelOption value={'on'} selected={panel} onSelect={setPanel}>
          <i className={'fas fa-land-mine-on'} />
        </PanelOption>
        <PanelOption value={'fill'} selected={panel} onSelect={setPanel}>
          <i className={'fas fa-fill'} />
        </PanelOption>
      </header>
      <main className={'flex-grow-1 d-flex flex-column justify-content-center align-items-center p-5 gap-3'}>
        {(panel === 'on') ? (
          <Switch value={on} onChange={setOn} />
        ) : (panel === 'fill') ? (
          <>
            <label className={'w-100 text-center'}>
              <Slider style={hueStyle} min={0} max={255} value={hue} onChange={setHue} />
              HUE
            </label>

            <label className={'w-100 text-center'}>
              <Slider style={saturationStyle} min={0} max={255} value={saturation} onChange={setSaturation} />
              SATURATION
            </label>

            <label className={'w-100 text-center'}>
              <Slider style={valueStyle} min={0} max={255} value={value} onChange={setValue} />
              BRIGHTNESS
            </label>
          </>
        ) : (null)}
      </main>
    </div>
  );
};

export default ControlPanel;
