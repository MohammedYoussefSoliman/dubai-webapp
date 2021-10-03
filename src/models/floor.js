import "../styles.scss";
import { imageTagGenerator, tagGenerator, getSearchQuery } from "../functions";
import backArrow from "../assets/svgs/back.svg";
import arrow from "../assets/svgs/arrow.svg";
import { floor_plans } from "../assets/images/floor_plans";
import plans from "../assets/images/plans";
import { logo } from "../assets/images";
const xlink = "http://www.w3.org/1999/xlink";
const xmlns = "http://www.w3.org/2000/svg";
export default class Floor {
  constructor(buildingData, wrapper) {
    this.floorNumber = getSearchQuery("floor");
    this.unitId = getSearchQuery("unit");
    this.buildingData = buildingData;
    this.wrapper = wrapper;
    this.floor = buildingData.floors.find(
      (floor) => floor.floor == this.floorNumber
    );
    this.history = {
      floor: this.floor.floor,
    };

    this.units = this.floor.units;
    if (this.unitId) {
      this.unit = this.units.find((u) => u.id == this.unitId);
    } else {
      this.unit = this.units[0];
      this.unitId = 1;
    }
  }

  allUnits = [];

  generateSvgWrapper() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("content--wrapper");
    return wrapper;
  }

  generateImage(imageData) {
    const image = document.createElementNS(xmlns, "image");
    image.setAttributeNS(null, "width", `${imageData.width}`);
    image.setAttributeNS(null, "height", `${imageData.height}`);
    image.setAttributeNS(xlink, "href", `${imageData.xlink}`);
    if (imageData.transform) {
      image.setAttributeNS(null, "transform", `${imageData.transform}`);
    }
    return image;
  }

  generatePreviewUnits(units) {
    const svg = document.createElementNS(xmlns, "svg");
    const g = document.createElementNS(xmlns, "g");
    svg.setAttributeNS(null, "viewBox", `${this.floor.preview.viewBox}`);
    svg.classList.add("preview--svg");
    g.setAttributeNS(null, "transform", `${this.floor.preview.transform}`);
    units.forEach((previewUnit) => {
      const path = document.createElementNS(xmlns, "path");
      path.classList.add("preview--path");
      path.setAttribute("data-name", previewUnit.id);
      path.setAttribute("id", previewUnit.id);
      path.setAttributeNS(null, "d", `${previewUnit.shape.d}`);
      path.setAttributeNS(null, "transform", `${previewUnit.shape.transform}`);
      g.appendChild(path);
      if (previewUnit.id == this.unitId) {
        path.classList.add("active--blinker");
      }
      g.appendChild(path);
    });
    svg.appendChild(g);
    return svg;
  }

  static floorLoadingScreen() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("loading--page");
    const image = document.createElement("img");
    image.setAttribute("src", logo.dark);
    image.classList.add("loading--page__img");
    const text = document.createElement("h3");
    text.classList.add("loading--page__text");
    text.innerText = "Loading...";
    wrapper.appendChild(image);
    wrapper.appendChild(text);
    return wrapper;
  }

  generateStatisticsItem(value, label) {
    const wrapper = document.createElement("div");
    const header = document.createElement("h3");
    const lower = document.createElement("p");
    wrapper.classList.add("statistics--item");
    header.innerHTML = `${value}m<sup>2</sup>`;
    lower.innerText = label;
    wrapper.appendChild(header);
    wrapper.appendChild(lower);
    return wrapper;
  }

  generateBackNavigation() {
    const navigation = document.createElement("a");
    navigation.classList.add("navigation");
    navigation.classList.add("back");
    navigation.setAttribute("href", `index.html`);
    const navigationText = document.createElement("p");
    navigationText.classList.add("unit--footer--text");
    navigationText.innerText = "Back home";
    const arrowImage = document.createElement("img");
    arrowImage.setAttribute("src", arrow);
    arrowImage.style.transform = "rotate(180deg)";
    navigation.appendChild(navigationText);
    navigation.appendChild(arrowImage);
    return navigation;
  }
  generateUnitFooter() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("unit--footer");
    return wrapper;
  }

  generateUnitInfo(floor, unit) {
    const unitFooter = document.createElement("div");
    unitFooter.classList.add("unit--info");
    const unitNameText = document.createElement("h3");
    unitNameText.innerText = `${unit.name}`;
    const navigation = document.createElement("a");

    navigation.setAttribute("href", `floor.html?floor=${floor.floor + 1}`);
    const navigationText = document.createElement("p");
    navigationText.classList.add("unit--footer--text");
    navigationText.innerText = "Next floor";
    navigation.classList.add("navigation");
    const arrowImage = document.createElement("img");
    arrowImage.setAttribute("src", arrow);
    navigation.appendChild(navigationText);
    navigation.appendChild(arrowImage);

    unitFooter.appendChild(unitNameText);
    unitFooter.appendChild(navigation);

    return unitFooter;
  }

  unitSectionGenerator(
    floor,
    unit,
    unitFooter,
    unitArea,
    outdoorarea,
    previewUnits
  ) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("unit");
    const unitsPreviewWrapper = document.createElement("div");
    unitsPreviewWrapper.classList.add("preview");
    const unitView = document.createElement("div");
    unitView.classList.add("view");
    const viewImage = document.createElement("img");
    viewImage.setAttribute("src", plans[floor.floor][unit.name]);
    unitView.appendChild(viewImage);

    const statistics = document.createElement("div");
    statistics.classList.add("statistics");
    statistics.appendChild(unitArea);
    if (outdoorarea) {
      statistics.appendChild(outdoorarea);
    }
    unitsPreviewWrapper.appendChild(previewUnits);

    wrapper.appendChild(unitsPreviewWrapper);
    wrapper.appendChild(unitView);
    wrapper.appendChild(statistics);
    wrapper.appendChild(unitFooter);
    return wrapper;
  }

  render() {
    const {
      floorNumber,
      floor,
      unit,
      units,
      allUnits,
      wrapper,
      generateSvgWrapper,
      generateImage,
      unitSectionGenerator,
      generateUnitFooter,
      generateBackNavigation,
      generateUnitInfo,
      buildingData,
    } = this;
    const svgWrapper = generateSvgWrapper();

    const svg = document.createElementNS(xmlns, "svg");
    const g = document.createElementNS(xmlns, "g");
    svg.setAttributeNS(null, "viewBox", `${floor.svg.viewBox}`);
    g.setAttributeNS(null, "transform", `${floor.g.transform}`);
    const image = generateImage({
      xlink: floor_plans[floorNumber],
      width: floor.image.width,
      height: floor.image.height,
      transform: floor.image.transform,
    });
    const imageLogo = generateImage({
      xlink: logo.light,
      width: buildingData.logoImage.width,
      height: buildingData.logoImage.height,
      transform: buildingData.logoImage.transform,
    });
    g.appendChild(image);
    g.appendChild(imageLogo);
    svg.appendChild(g);
    svgWrapper.appendChild(svg);
    const unitArea = this.generateStatisticsItem(
      unit.planInfo.area,
      "Unit area"
    );
    let outdoorarea = null;
    if (unit.planInfo.outDoorArea) {
      outdoorarea = this.generateStatisticsItem(
        unit.planInfo.outDoorArea,
        "Outdoor area"
      );
    }
    const unitFooter = generateUnitFooter();
    const backNavigation = generateBackNavigation();
    const unitName = generateUnitInfo(floor, unit);
    unitFooter.appendChild(backNavigation);
    unitFooter.appendChild(unitName);
    const previewUnits = this.generatePreviewUnits(floor.unitsPreview);
    const unitSection = unitSectionGenerator(
      floor,
      unit,
      unitFooter,
      unitArea,
      outdoorarea,
      previewUnits
    );
    wrapper.appendChild(svgWrapper);
    svgWrapper.appendChild(unitSection);

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
        console.log(unit);
        if (currentUnit.status === "available") {
          window.location.href = `floor.html?floor=${floor.floor}&unit=${unit.id}`;
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
}
