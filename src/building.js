import scss from "./styles.module.scss";

export default class Building {
  constructor(buildingData, background, wrapper) {
    this.buildingData = buildingData;
    this.background = background;
    this.wrapper = wrapper;
  }
  anchors = [];
  paths = [];

  generatFloorAnchors(pathname, anchorArray) {
    let floorOrder = document.createElement("a");
    floorOrder.classList.add("anchor");
    floorOrder.setAttribute("data-name", `${pathname}`);
    if (pathname === "0") {
      floorOrder.innerText = `G`;
    } else if (pathname.length < 2) {
      floorOrder.innerText = `0${pathname}`;
    } else {
      floorOrder.innerText = `${pathname}`;
    }
    // floorOrdersWrapper.appendChild(floorOrder);
    anchorArray.push(floorOrder);
  }

  render() {
    const { buildingData, background, wrapper, anchors, paths } = this;
    const xmlns = "http://www.w3.org/2000/svg";
    const xlink = "http://www.w3.org/1999/xlink";
    const svg = document.createElementNS(xmlns, "svg");
    const g = document.createElementNS(xmlns, "g");
    const image = document.createElementNS(xmlns, "image");
    svg.classList.add(scss["building--shape"]);
    svg.setAttributeNS(null, "viewBox", `${buildingData.svg.viewBox}`);
    svg.setAttribute("id", `${buildingData.project}`);
    image.setAttributeNS(null, "width", `${buildingData.image.width}`);
    image.setAttributeNS(null, "height", `${buildingData.image.height}`);
    if (buildingData.image.transform) {
      image.setAttributeNS(
        null,
        "transform",
        `${buildingData.image.transform}`
      );
    }
    image.setAttributeNS(xlink, "href", `${background}`);
    g.appendChild(image);
    //generation floors
    buildingData.floors.forEach((floor) => {
      const path = document.createElementNS(xmlns, "path");
      path.classList.add(scss["floor-path"]);
      path.classList.add(scss["path"]);
      path.setAttribute("data-name", `${floor.floor}`);
      path.setAttributeNS(null, "d", `${floor.path.d}`);
      path.setAttributeNS(null, "transform", `${floor.path.transform}`);
      g.appendChild(path);
      paths.push(path);
      this.generatFloorAnchors(`${floor.floor}`, anchors);
    });
    // generate dynamic counter
    paths.forEach((path, index) => {
      path.addEventListener("mouseenter", () => {
        let count;
        switch (index) {
          case 0:
            count = `G`;
            break;
          case 1:
            count = `${index}<sup>st</sup>`;
            break;
          case 2:
            count = `${index}<sup>nd</sup>`;
            break;
          case 3:
            count = `${index}<sup>rd</sup>`;
            break;
          default:
            count = `${index < 10 ? "0" : ""}${index}`;
        }
        anchors.forEach((anchor) => {
          if (path.dataset.name === anchor.dataset.name) {
            anchor.classList.add("active");
          } else {
            anchor.classList.remove("active");
          }
        });
        return count;
      });
    });
    svg.appendChild(g);
    wrapper.insertAdjacentElement("afterbegin", svg);
    // wrapper.appendChild(svg);
    paths.forEach((floor) => {
      floor.addEventListener("click", () => {
        window.location.href = `floor.html?project=${buildingData.project}&floor=${floor.dataset.name}`;
      });
    });
    anchors.forEach((floor) => {
      floor.addEventListener("click", () => {
        window.location.href = `floor.html?project=${buildingData.project}&floor=${floor.dataset.name}`;
      });
    });
  }
  renderNavigation() {
    console.log(this.anchors);
    return this.anchors;
  }
}
