import scss from "../styles.module.scss";
export default class Building {
  constructor(
    buildingData,
    background,
    counterWrapper,
    anchorsWrapper,
    wrapper
  ) {
    this.buildingData = buildingData;
    this.background = background;
    this.wrapper = wrapper;
    this.counterWrapper = counterWrapper;
    this.anchorsWrapper = anchorsWrapper;
  }
  anchors = [];
  paths = [];

  set anchorClass(className) {
    this.anchorClass = className;
  }

  generatFloorAnchors(pathname, anchorArray) {
    const anchorWrapper = document.createElement("div");
    const anchor = document.createElement("a");
    if (this.anchorClass) {
      anchorWrapper.classList.add(this.anchorClass);
    } else {
      anchorWrapper.classList.add(scss["anchor"]);
    }
    anchorWrapper.setAttribute("data-name", `${pathname}`);
    if (pathname === "0") {
      anchor.innerText = `G`;
    } else if (pathname.length < 2) {
      anchor.innerText = `0${pathname}`;
    } else {
      anchor.innerText = `${pathname}`;
    }
    anchorWrapper.appendChild(anchor);
    this.anchorsWrapper.appendChild(anchorWrapper);
    anchorArray.push(anchorWrapper);
  }

  render() {
    const {
      buildingData,
      background,
      wrapper,
      anchors,
      paths,
      counterWrapper,
    } = this;
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
    counterWrapper.innerHTML = `<h2>- -</h2>`;

    // generate path effects
    paths.forEach((path, index) => {
      path.addEventListener("mouseenter", () => {
        // update counter:
        if (index === 0) {
          counterWrapper.innerHTML = `<h2>G</h2>`;
        } else {
          counterWrapper.innerHTML = `<h2>${
            index < 10 ? "0" : ""
          }${index}</h2>`;
        }
        // update floor anchors:
        anchors.forEach((anchor) => {
          if (path.dataset.name === anchor.dataset.name) {
            anchor.classList.add(scss["active"]);
          } else {
            anchor.classList.remove(scss["active"]);
          }
        });
      });
      path.addEventListener("mouseleave", () => {
        path.classList.remove(scss["active"]);
        anchors.forEach((anchor) => {
          anchor.classList.remove(scss["active"]);
        });
        counterWrapper.innerHTML = `<h2>- -</h2>`;
      });
    });
    svg.appendChild(g);
    wrapper.insertAdjacentElement("afterbegin", svg);
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
    // handle anchors effects
    anchors.forEach((anchor, index) => {
      anchor.addEventListener("mouseenter", () => {
        anchor.classList.add(scss["active"]);
        if (index === 0) {
          counterWrapper.innerHTML = `<h2>G</h2>`;
        } else {
          counterWrapper.innerHTML = `<h2>${
            index < 10 ? "0" : ""
          }${index}</h2>`;
        }
        paths.forEach((floor) => {
          if (anchor.dataset.name === floor.dataset.name) {
            floor.classList.add(scss["active"]);
          } else {
            floor.classList.remove(scss["active"]);
          }
        });
      });
      anchor.addEventListener("mouseleave", () => {
        anchor.classList.remove(scss["active"]);
        paths.forEach((floor) => {
          floor.classList.remove(scss["active"]);
        });
        counterWrapper.innerHTML = `<h2>- -</h2>`;
      });
    });
  }
}
