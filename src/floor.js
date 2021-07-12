import Floor from "./models/floor";
import data from "../data/data.json";
import scss from "./styles.module.scss";
import logo from "./assets/svgs/logo.svg";
import { imageTagGenerator, tagGenerator } from "./helpers";

const app = document.getElementById("app");
const navigation = document.getElementById("navigation");
const header = document.getElementById("navigation__header");
const searchWrapper = document.getElementById("navigation__search");
const searchInput = document.getElementById("search_unit");
const footer = document.getElementById("navigation__footer");
const contentWrapper = document.getElementById("content");
const shapeWrapper = document.getElementById("shape");
const unitsWrapper = document.getElementById("units");
const counterWrapper = document.getElementById("counter");
navigation.classList.add(scss["floor--navigation"]);
app.classList.add(scss["floor"]);

const back = document.getElementById("back");
back.classList.add(scss["back"]);
contentWrapper.classList.add(scss["floor--content"]);
shapeWrapper.classList.add(scss["floor--content__shape"]);
unitsWrapper.classList.add(scss["floor--content__units"]);
const currentFloor = new Floor(
  data[0],
  back,
  searchInput,
  shapeWrapper,
  unitsWrapper
);

currentFloor.render();
currentFloor.navigation();

// header generator
header.classList.add(scss["header"]);
header.appendChild(imageTagGenerator(logo));
header.appendChild(
  tagGenerator("h3")({
    content: "New Capital - MU2 - 62",
    classes: [scss["header--label"]],
  })
);
// render anchores
searchWrapper.classList.add(scss["floor--navigation__search"]);
// footer generator
footer.classList.add(scss["footer"]);
counterWrapper.classList.add(scss["counter"]);
counterWrapper.appendChild(
  tagGenerator("h2")({
    content: currentFloor.getFloorNumber,
  })
);

if (currentFloor.getFloorNumber === "00") {
  contentWrapper.classList.add(scss["ground"]);
}
// footer.insertAdjacentElement("afterbegin", imageTagGenerator(ronzaLogo));
