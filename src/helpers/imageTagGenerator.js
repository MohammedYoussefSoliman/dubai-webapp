/**
 * a function that takes the image import with a class list and returns an img tag with the added img and classes
 * @param {string} image
 * @param {array} classNames
 */

export default function imageTagGenerator(image, classNames) {
  const img = document.createElement("img");
  img.setAttribute("src", image);
  if (classNames && classNames.length) {
    for (let c of classNames) {
      img.classList.add(c);
    }
  }
  return img;
}
