const el = document.createElement.bind(document);
class Item {
  constructor(x, y, parentSelector, element, width, height, scale) {
    const div = lib.appendToDiv(parentSelector, el('div'));
    div.classList.add('item');
    div.style.left = `${x}vw`;
    div.style.top = `${y}px`;
    if (width) div.style.width = `${width * 10}vw`;
    if (height) div.style.height =  `${height * 10}vw`;
    if (scale) div.style.transform = `scale(${scale})`;
    lib.appendToDiv(div, element);
  }
}

class Cloud {
  constructor(x, y, scale) {
    scale = scale || 0.5;
    const div = lib.appendToDiv('.clouds', el('div'));
    div.classList = 'cloud item';
    div.style.left = `${x}%`;
    div.style.top = `calc(${y}vh / 2)`;
    div.style.transform = `scale(${scale})`;
    const img = lib.appendToDiv(div, el('img'));
    img.src = 'img/png/cloud.png';
  }
}

class Platform {
  constructor(x, y, width) {
    const div = lib.appendToDiv('.platforms', el('div'));
    div.classList = 'platform item';
    const scale = 0.18;
    div.style.left = `calc(100vw * ${x} / 57)`;
    div.style.top = `calc(100vw * ${y} / 57)`;
    div.style.width = `calc(100vw * ${width} / 57)`
    div.dataset.x = x;
    div.dataset.y = y;
    div.dataset.width = width;
  }
}
