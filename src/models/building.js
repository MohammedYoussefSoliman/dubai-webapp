import "../styles.scss";
export default class Building {
  constructor(buildingData, background, wrapper, navigationWrapper) {
    this.buildingData = buildingData;
    this.background = background;
    this.navigationWrapper = navigationWrapper;
    this.wrapper = wrapper;
  }

  paths = [];
  navigationButtons = [];

  generatFloorsNavigations(floor, containerArray) {
    const navigationButton = document.createElement("button");
    navigationButton.classList.add("navigation--button");
    navigationButton.setAttribute("data-name", `${floor}`);
    navigationButton.innerText = `Floor ${floor}`;
    if (floor === "0") {
      navigationButton.innerText = `Ground`;
    } else {
      navigationButton.innerText = `Floor ${floor}`;
    }
    containerArray.push(navigationButton);
  }

  render() {
    const {
      buildingData,
      background,
      wrapper,
      paths,
      navigationWrapper,
      navigationButtons,
    } = this;
    const xmlns = "http://www.w3.org/2000/svg";
    const xlink = "http://www.w3.org/1999/xlink";
    const svg = document.createElementNS(xmlns, "svg");
    const g = document.createElementNS(xmlns, "g");
    const image = document.createElementNS(xmlns, "image");
    svg.classList.add("building--shape");
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
      path.classList.add("floor-path");
      path.classList.add("path");
      path.setAttribute("data-name", `${floor.floor}`);
      path.setAttributeNS(null, "d", `${floor.path.d}`);
      path.setAttributeNS(null, "transform", `${floor.path.transform}`);
      g.appendChild(path);
      paths.push(path);
      this.generatFloorsNavigations(`${floor.floor}`, navigationButtons);
    });

    svg.appendChild(g);
    wrapper.insertAdjacentElement("afterbegin", svg);

    navigationButtons.forEach((button) => {
      navigationWrapper.appendChild(button);
    });
    // handle floor pathes click
    paths.forEach((floor) => {
      floor.addEventListener("click", () => {
        window.location.href = `floor.html?project=${buildingData.project}&floor=${floor.dataset.name}`;
      });
    });

    // handle floor pathes click
    navigationButtons.forEach((button) => {
      button.addEventListener("click", () => {
        window.location.href = `floor.html?project=${buildingData.project}&floor=${button.dataset.name}`;
      });
    });
  }
}
