/**
 * a function that takes HTML tag name with a class list and returns the tag with the wrapped content and with classes
 * @param {string} tag
 * @param {object} tagConfig
 * @returns HTML tag element
 */

export default function tagGenerator(tag) {
  return function (tagConfig) {
    const { classes, content } = tagConfig;
    const element = document.createElement(tag);
    if (classes && classes.length) {
      for (let c of classes) {
        element.classList.add(c);
      }
    }
    if (typeof content === "string") {
      element.innerText = content;
    } else {
      element.innerHTML = content;
    }
    return element;
  };
}
