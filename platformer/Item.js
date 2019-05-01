const el = document.createElement.bind(document);
class Item {
  constructor(x, y, parentSelector, element, width, height, scale) {
    const div = lib.appendToDiv(parentSelector, el('div'));
    div.classList.add('item');
    div.style.left = `${x}%`;
    div.style.top = `${y}%`;
    if (width) div.style.width = `${width}%`;
    if (height) div.style.height = height;
    if (scale) div.style.transform = `scale(${scale})`;
    lib.appendToDiv(div, element);
  }
}

class Cloud extends Item {
  constructor(x, y, scale) {
    scale = scale || 0.5;
    const img = el('img');
    img.src = 'img/png/cloud.png';
    super(x, y, '.clouds', img, null, null, scale);
  }
}

class Platform extends Item {
  constructor(x, y, width) {
    // const div = el('div');
    // const append = e => lib.appendToDiv(div, e);
    // const [left, middle, right] = [append(el('img')), append(el('div')), append(el('img'))]
    // left.src = 'img/png/platform-left.png';
    // middle.style.width = `${width}%`;
    // right.src = 'img/png/platform-right.png';
    const div = el('div');
    div.className = 'platform';
    super(x / 2.4 + 1, y, '.platforms', div, width / 2.4, '2.5%');
  }
}
