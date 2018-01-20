import React from 'react';
import PropTypes from 'prop-types';
import './Gallows.css';

const createElement = (elementName, additionalAttributes) => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', elementName);
    if (additionalAttributes) {
        Object.entries(additionalAttributes).forEach(([key, value]) =>
            element.setAttribute(key, value));
    }
    return element;
};

const createPath = data => {
    const path = createElement('path');
    path.setAttribute('d', data);
    return path;
};

const DRAWING_DATA = [
    "M 50 280 L 250 280",
    "M 200 280 L 200 50",
    "M 200 50 L 100 50",
    "M 160 50 L 200 90",
    "M 100 50 L 100 80",
    "M 100 95 m -15 0 a 15 15 0 1 0 30 0 a 15 15 0 1 0 -30 0",
    "M 100 110 L 100 190",
    "M 100 130 L 70 140",
    "M 100 130 L 130 140",
    "M 100 190 L 60 230",
    "M 100 190 L 140 230"
];

const drawGallows = (svg, numBadGuesses) => {
    if (svg) {
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }
        DRAWING_DATA.forEach((data, index) => {
            if (index < numBadGuesses) {
                const path = createPath(data);
                svg.appendChild(path);
            }
        });
    }
};

const Gallows = props => {
    return (
        <div>
            <svg id="gallows" ref={svg => drawGallows(svg, props.badGuesses.length)}></svg>
        </div>
    );
};

Gallows.propTypes = {
    badGuesses: PropTypes.string.isRequired
};

export default Gallows;
