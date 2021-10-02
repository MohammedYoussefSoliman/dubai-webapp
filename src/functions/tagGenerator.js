import Is from "@flk/supportive-is";

/**
 * a function that takes HTML tag name with a class list and returns the tag with the wrapped content and with classes
 * @param {string} tag
 * @param {object} tagConfig
 * @param {object} styles
 * @returns HTML tag element
 */

export default function tagGenerator(tag) {
  return function (tagConfig, styles = {}) {
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
    if (!Is.empty(styles)) {
      for (let key in styles) {
        element.styles[key] = styles[key];
      }
    }
    return element;
  };
}
