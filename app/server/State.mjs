class State extends EventTarget {
  #attributes;
  #values;

  constructor(attributes) {
    super();
    this.#attributes = attributes;
    this.#values = {};

    Object.keys(this.#attributes).forEach((attribute) => {
      this.#values[attribute] = this.#attributes[attribute].initial;
    });
  }

  update(values) {
    const previous = this.#values;
    const next = { ...previous };
    Object.keys(this.#attributes).forEach((attribute) => {
      if (attribute in values)
        next[attribute] = this.#attributes[attribute].type.parse(values[attribute]);
    });
    for (const attribute in this.#attributes) {
      if (previous[attribute] !== next[attribute]) {
        this.#values = next;
        this.dispatchEvent(new Event('change'));
        return true;
      }
    }
    return false;
  }

  valueOf() {
    let value = [];
    Object.keys(this.#attributes).forEach((attribute) => {
      value = value.concat(this.#attributes[attribute].type.buffer(this.#values[attribute]));
    });
    return value;
  }

  toJSON() {
    return this.#values;
  }
}

export default State;
