/* eslint-disable no-unused-vars */
function dimensions(object) {
  return {
    l: object.x,
    r: object.x + object.width,
    t: object.y,
    b: object.y + object.height
  };
}

const lib = {
  dimensions: dimensions
};
