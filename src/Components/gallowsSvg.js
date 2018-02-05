const createSVGElement = (document, elementName) =>
  document.createElementNS('http://www.w3.org/2000/svg', elementName);

const createPath = (document, data) => {
  const path = createSVGElement(document, 'path');
  path.setAttribute('d', data);
  return path;
};

const DRAWING_DATA_1 = [
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

const DRAWING_DATA_2 = [
  'M 50 280 L 250 280',
  'M 200 280 L 200 50',
  'M 200 50 L 100 50',
  'M 160 50 L 200 90',
  'M 100 50 L 100 80',
  'M 85 95 A 15 15 0 1 0 85 94.9',
  'M 100 110 L 95 175',
  'M 98 130 A 80 80 1 0 0 90 168',
  'M 99 130 A 80 80 0 0 1 107 170',
  'M 95 175 A 80 72 1 0 0 90 228',
  'M 95 175 A 40 60 0 0 1 92 238'
];

export const NUM_GALLOWS_STEPS = DRAWING_DATA_1.length;

const removeChidren = node => {
  if (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
    removeChidren(node);
  }
};

export const drawGallows = numBadGuesses => svg => {
  if (svg) {
    removeChidren(svg);
    const drawingData = numBadGuesses === NUM_GALLOWS_STEPS
      ? DRAWING_DATA_2
      : DRAWING_DATA_1;
    drawingData.forEach((data, index) => {
      if (index < numBadGuesses) {
        const path = createPath(svg.ownerDocument, data);
        svg.appendChild(path);
      }
    });
  }
};
