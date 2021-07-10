import scss from "../styles.module.scss";
import { imageTagGenerator, tagGenerator, getSearchQuery } from "../helpers";
import backArrow from "../assets/svgs/back.svg";
import { floor_plans } from "../assets/images/floor_plans";
export default class Floor {
  constructor(buildingData, back, searchInput, svgWrapper, unitsWrapper) {
    this.floorNumber = getSearchQuery("floor");
    this.buildingData = buildingData;
    this.back = back;
    this.searchInput = searchInput;
    this.svgWrapper = svgWrapper;
    this.unitsWrapper = unitsWrapper;
    this.floor = buildingData.floors.find(
      (floor) => floor.floor == this.floorNumber
    );
    this.history = {
      project: buildingData.project,
      floor: this.floor.floor,
    };

    if (this.floor.floor >= 4) {
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

  render() {
    const {
      buildingData,
      floorNumber,
      floor,
      units,
      allUnits,
      unitsWrapper,
      svgWrapper,
    } = this;

    console.log(buildingData);
    console.log(units);
    const xmlns = "http://www.w3.org/2000/svg";
    const xlink = "http://www.w3.org/1999/xlink";
    const svg = document.createElementNS(xmlns, "svg");
    const g = document.createElementNS(xmlns, "g");
    const image = document.createElementNS(xmlns, "image");
    // svg.classList.add("floor-map-shape");
    svg.setAttributeNS(null, "viewBox", `${floor.svg.viewBox}`);
    g.setAttributeNS(null, "transform", `${floor.g.transform}`);
    if (floor.image.transform) {
      image.setAttributeNS(null, "transform", `${floor.image.transform}`);
    }
    image.setAttributeNS(xlink, "href", `${floor_plans[floorNumber]}`);
    g.appendChild(image);
    svg.appendChild(g);
    svgWrapper.appendChild(svg);
    units.forEach((unit) => {
      // generate the paths
      const path = document.createElementNS(xmlns, "path");
      path.classList.add("unit-path");
      path.classList.add("path");
      path.setAttribute("data-name", unit.id);
      path.setAttribute("id", unit.id);
      path.setAttributeNS(null, "d", `${unit.shape.d}`);
      path.setAttributeNS(null, "transform", `${unit.shape.transform}`);
      g.appendChild(path);
      allUnits.push(path);
      // generate the unit anchors
      const unitAnchor = document.createElement("div");
      unitAnchor.classList.add(scss["unit"]);
      const anchor = document.createElement("a");
      const numberSpan = document.createElement("span");
      numberSpan.classList.add(scss["number"]);
      unitAnchor.id = `${unit.id}`;
      anchor.setAttribute(
        "href",
        `unit.html?floor=${floor.floor}&unit=${unit.id}`
      );
      anchor.innerText = `${unit.type} - ${unit.unit ? unit.unit : ""}`;
      if (unit.type === "resid") {
        numberSpan.innerText = `a${floorNumber}${unit.name}`;
      } else {
        numberSpan.innerText = `${floorNumber}${unit.name}`;
      }
      unitAnchor.appendChild(anchor);
      unitAnchor.insertAdjacentElement("afterbegin", numberSpan);
      allUnits.push(unitAnchor);
      unitsWrapper.appendChild(unitAnchor);
    });

    allUnits.forEach((unit) => {
      unit.addEventListener("click", (event) => {
        event.preventDefault();
        if (unit.isAvailable) {
          window.location.href = `unit.html?floor=${floor.floor}&unit=${unit.id}`;
        } else {
          return;
        }
      });
    });
  }

  searchUnit(units) {
    const { searchInput, history } = this;
    searchInput.addEventListener("keyup", (e) => {
      e.preventDefault();
      console.log(e.target.value);
      units.forEach((unit) => {
        if (e.target.value.toLowerCase() === unit.name.toLowerCase()) {
          unit.classList.add(scss["active"]);
          // searchErr.classList.remove("error");
          console.log(unit);
        }
      });
    });
    searchInput.addEventListener("keydown", (e) => {
      if (e.target.value === "") {
        units.forEach((unit) => {
          unit.classList.remove(scss["active"]);
        });
      }
      units.forEach((unit, index) => {
        if (e.target.value.toLowerCase() === unit.name.toLowerCase()) {
          e.preventDefault();
          if (e.keyCode === 13) {
            window.location.href = `unit.html?floor=${history.floor}&unit=${
              index + 1
            }`;
          }
        } else {
          // searchErr.innerText = `unit "${e.target.value}" can not be found`;
          // searchErr.classList.add('error');
        }
      });
    });
  }

  navigation() {
    const { back, history } = this;
    const backAnchor = document.createElement("a");
    backAnchor.appendChild(imageTagGenerator(backArrow));
    backAnchor.setAttribute("href", `index.html`);
    const list = document.createElement("ul");
    list.classList.add(scss["back--list"]);

    for (let key in history) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      li.classList.add(scss["back--list__item"]);
      a.innerText = history[key];
      a.setAttribute("href", `index.html`);
      switch (key) {
        case "project":
          a.innerText = `Back to ${history[key]} building`;
          break;
        case "floor":
          li.classList.add(scss["active"]);
          a.setAttribute("href", "");
          switch (history[key]) {
            case 0:
              a.innerText = `Ground floor`;
              break;
            case 1:
              a.innerText = `1st floor`;
              break;
            case 2:
              a.innerText = `2nd floor`;
              break;
            case 3:
              a.innerText = `3rd floor`;
              break;
            default:
              a.innerText = `floor ${history[key]}`;
              break;
          }
          break;
      }
      li.appendChild(a);
      list.appendChild(li);
    }
    back.appendChild(backAnchor);
    back.appendChild(list);
  }
}
