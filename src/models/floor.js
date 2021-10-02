import "../styles.scss";
import { imageTagGenerator, tagGenerator, getSearchQuery } from "../functions";
import backArrow from "../assets/svgs/back.svg";
import { floor_plans } from "../assets/images/floor_plans";
export default class Floor {
  constructor(buildingData, wrapper) {
    this.floorNumber = getSearchQuery("floor");
    this.buildingData = buildingData;
    this.wrapper = wrapper;
    this.floor = buildingData.floors.find(
      (floor) => floor.floor == this.floorNumber
    );
    this.history = {
      project: buildingData.project,
      floor: this.floor.floor,
    };

    if (this.floor.floor >= 4 && this.floor.floor < 10) {
      this.units = buildingData.typicalUnits;
    } else {
      this.units = this.floor.units;
    }
  }

  get getFloorNumber() {
    if (this.floorNumber.length < 2) {
      return `0${this.floorNumber}`;
    } else if (this.floorNumber == 0) {
      return "G";
    } else {
      return this.floorNumber;
    }
  }

  allUnits = [];

  generateSvgWrapper() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("content--wrapper");
    return wrapper;
  }

  render() {
    const { floorNumber, floor, units, allUnits, wrapper, generateSvgWrapper } =
      this;
    const svgWrapper = generateSvgWrapper();

    const xmlns = "http://www.w3.org/2000/svg";
    const xlink = "http://www.w3.org/1999/xlink";
    const svg = document.createElementNS(xmlns, "svg");
    const g = document.createElementNS(xmlns, "g");
    const image = document.createElementNS(xmlns, "image");
    svg.setAttributeNS(null, "viewBox", `${floor.svg.viewBox}`);
    g.setAttributeNS(null, "transform", `${floor.g.transform}`);
    if (floor.image.transform) {
      image.setAttributeNS(null, "transform", `${floor.image.transform}`);
    }
    image.setAttributeNS(null, "width", `${floor.image.width}`);
    image.setAttributeNS(null, "height", `${floor.image.height}`);
    image.setAttributeNS(xlink, "href", `${floor_plans[floorNumber]}`);
    g.appendChild(image);
    svg.appendChild(g);
    svgWrapper.appendChild(svg);
    wrapper.appendChild(svgWrapper);
    units.forEach((unit) => {
      // generate the paths
      const path = document.createElementNS(xmlns, "path");
      path.classList.add("unit--path");
      path.classList.add("path");
      path.setAttribute("data-name", unit.id);
      path.setAttribute("id", unit.id);
      path.setAttributeNS(null, "d", `${unit.shape.d}`);
      path.setAttributeNS(null, "transform", `${unit.shape.transform}`);
      g.appendChild(path);
      allUnits.push(path);
    });

    allUnits.forEach((unit) => {
      const currentUnit = units.find((u) => u.id == unit.id);
      unit.addEventListener("click", (event) => {
        if (currentUnit.status === "available") {
          window.location.href = `floor.html?floor=${floor.floor}&unit=${unit.name}`;
        } else {
          return;
        }
      });
      unit.addEventListener("mouseenter", (event) => {
        unit.classList.add("active");
      });
      unit.addEventListener("mouseleave", (event) => {
        unit.classList.remove("active");
      });
    });
  }

  // navigation() {
  //   const { back, history } = this;
  //   const backAnchor = document.createElement("a");
  //   backAnchor.appendChild(imageTagGenerator(backArrow));
  //   backAnchor.setAttribute("href", `index.html`);
  //   const list = document.createElement("ul");
  //   list.classList.add("back--list");

  //   for (let key in history) {
  //     const li = document.createElement("li");
  //     const a = document.createElement("a");
  //     li.classList.add("back--list__item");
  //     a.innerText = history[key];
  //     a.setAttribute("href", `index.html`);
  //     switch (key) {
  //       case "project":
  //         a.innerText = `Back to ${history[key]} building`;
  //         break;
  //       case "floor":
  //         li.classList.add("active");
  //         a.setAttribute("href", "");
  //         switch (history[key]) {
  //           case 0:
  //             a.innerText = `Ground floor`;
  //             break;
  //           case 1:
  //             a.innerText = `1st floor`;
  //             break;
  //           case 2:
  //             a.innerText = `2nd floor`;
  //             break;
  //           case 3:
  //             a.innerText = `3rd floor`;
  //             break;
  //           default:
  //             a.innerText = `floor ${history[key]}`;
  //             break;
  //         }
  //         break;
  //     }
  //     li.appendChild(a);
  //     list.appendChild(li);
  //   }
  //   back.appendChild(backAnchor);
  //   back.appendChild(list);
  // }
}
