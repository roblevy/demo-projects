/* eslint global Item,Character */
function createSky() {
  for (let i = 0; i < 20; i++) {
    const x = lib.randBetween(0, 100);
    const y = lib.randBetween(0, 100);
    new Cloud(x, y);
  }
}

createSky();

window.addEventListener('scroll', e => {
  document.querySelector('.background').style.transform = `translateX(-${window.scrollY}px)`
})

function createRow(rowNumber, decimalCode, offset) {
  const binaryCode = decimalCode.toString(2).padStart(60, '0');
  const y = rowNumber;
  let prev = '0';
  const pixels = binaryCode.split('').reverse();
  let width = 0;
  let start;
  pixels.forEach((x, i) => {
    const prev = i > 0 ? pixels[i - 1] : '0';
    if (x === '1') {
      width += 1;
      if (prev === '0') start = i;
    }
    if ((x === '0' && prev === '1') || (x === '1' && i === pixels.length - 1)) {
      new Platform(start + offset, y, width);
      width = 0;
      start = null;
    }
  })
}

const codes = [
  [
    7785050678473,
    11083786036521,
    19879891969326,
    19879879517480,
    16987017648327,
    0,
    549755813888,
    1651198686121,
    4366180553897,
    8763689677743,
    4366180553897,
    1651199210665,
    549755813888,
  ], [
    4270168240873,
    571402750505,
    586696765551,
    616500969513,
    185305194576105,
  ], [
    14044961447011,
    14044978232935,
    14044999213927,
    14044999213935,
    13658431185771,
    13435067720571,
    206589420403,
    13464641748595,
    13327202786403,
  ]
];
codes.forEach((row, i) => {
  row.forEach((x, j) => {
    createRow(j, x, i * 80);
  })
});
