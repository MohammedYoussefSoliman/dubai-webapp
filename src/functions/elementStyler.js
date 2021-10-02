/**
 * a function that takes HTML tag name with a class list and returns the tag with the wrapped content and with classes
 * @param {string} tag
 * @param {object} styles
 * @returns HTML tag element
 */

export default function elementStyler(tag) {
  return function (styles) {
    const element = document.createElement(tag);
    for (let key in styles) {
      element.style[key] = styles[key];
    }
    return element;
  };
}
