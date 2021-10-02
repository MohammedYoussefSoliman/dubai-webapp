import "../styles.scss";
import { imageTagGenerator, tagGenerator, getSearchQuery } from "../helpers";
import backArrow from "../assets/svgs/back.svg";
import plans from "../assets/images/plans";

export default class Unit {
  constructor(
    buildingData,
    back,
    area,
    specsGrid,
    plan,
    plan3D,
    mapPreview,
    mapUnit
  ) {
    this.id = getSearchQuery("unit");
    this.floorNumber = getSearchQuery("floor");
    this.back = back;
    this.area = area;
    this.specsGrid = specsGrid;
    this.plan = plan;
    this.plan3D = plan3D;
    this.mapPreview = mapPreview;
    this.mapUnit = mapUnit;
    this.floor = buildingData.floors.find(
      (floor) => floor.floor == this.floorNumber
    );
    if (this.floor.floor >= 4 && this.floor.floor < 10) {
      this.units = buildingData.typicalUnits;
    } else {
      this.units = this.floor.units;
    }
    this.unit = this.units.find((u) => u.id == this.id);
    this.history = {
      project: buildingData.project,
      floor: this.floor.floor,
      unit: getSearchQuery("unit"),
    };
    if (this.floorNumber >= 4 && this.floor.floor < 10) {
      this.unitsPreview = buildingData.unitsPreview;
      this.gTransform = buildingData.preview.transform;
      this.viewBox = buildingData.preview.viewBox;
    } else {
      this.unitsPreview = this.floor.unitsPreview;
      this.gTransform = this.floor.preview.transform;
      this.viewBox = this.floor.preview.viewBox;
    }
  }

  get getUnitNumber() {
    if (this.unit.type === "resid") {
      return `a${this.floorNumber}${this.unit.name}`;
    } else {
      return `${this.floorNumber}${this.unit.name}`;
    }
  }

  render() {
    const {
      unit,
      area,
      plan,
      floorNumber,
      mapPreview,
      mapUnit,
      unitsPreview,
      gTransform,
      viewBox,
    } = this;
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    h3.innerText = "Unit area";
    p.innerHTML = `${unit.planInfo.area}m<sup>2</sup>`;
    area.appendChild(h3);
    area.appendChild(p);
    plan.appendChild(imageTagGenerator(planes[unit.plan]));
    const typeHeader = document.createElement("h3");
    typeHeader.innerText = `Unit - ${unit.type}`;
    const unitHeader = document.createElement("h3");
    unitHeader.classList.add("alternative");
    if (unit.type === "resid") {
      unitHeader.innerText = `Unit ${unit.name} (apartment)`;
    } else {
      unitHeader.innerText = `Unit ${unit.name}`;
    }
    mapUnit.appendChild(typeHeader);
    mapUnit.appendChild(unitHeader);
    // generate previewUnits
    const xmlns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(xmlns, "svg");
    const g = document.createElementNS(xmlns, "g");
    svg.setAttributeNS(null, "viewBox", `${viewBox}`);
    svg.classList.add("preview");
    g.setAttributeNS(null, "transform", `${gTransform}`);
    unitsPreview.forEach((previewUnit) => {
      const path = document.createElementNS(xmlns, "path");
      path.classList.add("preview--path");
      path.setAttribute("data-name", previewUnit.id);
      path.setAttribute("id", previewUnit.id);
      path.setAttributeNS(null, "d", `${previewUnit.shape.d}`);
      path.setAttributeNS(null, "transform", `${previewUnit.shape.transform}`);
      if (floorNumber == 0) {
        const pathOutoor = document.createElementNS(xmlns, "path");
        pathOutoor.classList.add("preview--outdoor");
        pathOutoor.setAttributeNS(null, "d", `${previewUnit.outdoor.d}`);
        pathOutoor.setAttributeNS(
          null,
          "transform",
          `${previewUnit.outdoor.transform}`
        );
        if (previewUnit.id === unit.id) {
          pathOutoor.classList.add("active--blinker");
        }
        g.appendChild(pathOutoor);
      }
      if (previewUnit.id === unit.id) {
        path.classList.add("active--blinker");
      }
      g.appendChild(path);
    });
    svg.appendChild(g);
    mapPreview.appendChild(svg);
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
  //     switch (key) {
  //       case "project":
  //         a.innerText = `Back to building`;
  //         a.setAttribute("href", `index.html`);
  //         break;
  //       case "floor":
  //         a.setAttribute(
  //           "href",
  //           `floor.html?project=${history["project"]}&floor=${history["floor"]}`
  //         );
  //         switch (history[key]) {
  //           case 0:
  //             a.innerText = `Ground floor`;
  //             break;
  //           case 1:
  //             a.innerText = `F floor`;
  //             break;
  //           case 2:
  //             a.innerText = `S floor`;
  //             break;
  //           default:
  //             a.innerText = `floor ${history[key]}`;
  //             break;
  //         }
  //         break;
  //       case "unit":
  //         li.classList.add("active");
  //         a.setAttribute("href", "");
  //         a.innerText = `${history["floor"]}${history[key]}`;
  //     }
  //     li.appendChild(a);
  //     list.appendChild(li);
  //   }
  //   back.appendChild(backAnchor);
  //   back.appendChild(list);
  // }
}
