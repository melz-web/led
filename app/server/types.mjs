const boolean = {
  parse: (o) => {
    if (o === true || o === false)
      return o;
    throw new TypeError();
  },
  buffer: (o) => [(o) ? 1 : 0]
};

const uint8 = {
  parse: (o) => {
    if (Number.isInteger(o) && 0 <= o <= 255)
      return o;
    throw new TypeError();
  },
  buffer: (o) => [o]
};


const uint16 = {
  parse: (o) => {
    if (Number.isInteger(o) && 0 <= o <= 65535)
      return o;
    throw new TypeError();
  },
  buffer: (o) => [o % 256, o >> 8]
};

export default { boolean, uint8, uint16 };
