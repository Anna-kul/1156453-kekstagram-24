const state = {};

export const getState = () => state;
export const setState = (key, value) => state[key] = value;
