import Color from 'color';

const hslString = (h, s, v) => Color.hsv(h, s, v).hsl().toString();
const sliderGradient = (n, cb) => `linear-gradient(to right, ${[...Array(n).keys()].map(cb).join(',')})`;

const hue = () => sliderGradient(9, (i) => hslString(i * 45, 100, 100));
const saturation = (h) => sliderGradient(10, (i) => hslString(h, i * 10, 100));
const value = (h, s) => sliderGradient(10, (i) => hslString(h, s, i * 10));

export default { hue, saturation, value };
