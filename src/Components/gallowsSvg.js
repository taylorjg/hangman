const createSVGElement = elementName =>
  document.createElementNS('http://www.w3.org/2000/svg', elementName);

const createPath = data => {
  const path = createSVGElement('path');
  path.setAttribute('d', data);
  return path;
};

const DRAWING_DATA = [
  'M 50 280 L 250 280',
  'M 200 280 L 200 50',
  'M 200 50 L 100 50',
  'M 160 50 L 200 90',
  'M 100 50 L 100 80',
  'M 85 95 A 15 15 0 1 0 85 94.9',
  'M 100 110 L 100 190',
  'M 100 130 L 70 140',
  'M 100 130 L 130 140',
  'M 100 190 L 60 230',
  'M 100 190 L 140 230'
];

export const NUM_GALLOWS_STEPS = DRAWING_DATA.length;

const removeChidren = node => {
  if (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
    removeChidren(node);
  }
};

export const drawGallows = numBadGuesses => svg => {
  if (svg) {
    removeChidren(svg);
    DRAWING_DATA.forEach((data, index) => {
      if (index < numBadGuesses) {
        const path = createPath(data);
        svg.appendChild(path);
      }
    });
  }
};
