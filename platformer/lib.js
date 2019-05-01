const lib = {
  appendToDiv: function(parent, element) {
    if (typeof parent === 'string') {
      parent = document.querySelector(parent);
    }
    parent.append(element);
    return element;
  },
  randBetween: function(min, max) {
    const rnd = Math.random();
    return rnd * (max - min) + min;
  }
}

