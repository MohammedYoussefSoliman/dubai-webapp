import Unit from "./models/unit";
import data from "../data/data.json";
import scss from "./styles.module.scss";
import logo from "./assets/svgs/logo.svg";
import { imageTagGenerator, tagGenerator } from "./helpers";
// dom
const app = document.getElementById("app");
const navigation = document.getElementById("navigation");
const header = document.getElementById("navigation__header");
const footer = document.getElementById("navigation__footer");
const contentWrapper = document.getElementById("content");
const counterWrapper = document.getElementById("counter");
const specs = document.getElementById("specs");
const area = document.getElementById("area");
const specsGrid = document.getElementById("specs_grid");
const plan = document.getElementById("plan");
const plan3D = document.getElementById("plan_3d");
const map = document.getElementById("map");
const mapUnit = document.getElementById("map_unit");
const mapPreview = document.getElementById("map_preview");
navigation.classList.add(scss["floor--navigation"]);
app.classList.add(scss["floor"]);

const back = document.getElementById("back");
back.classList.add(scss["back"]);
contentWrapper.classList.add(scss["floor--content"]);
contentWrapper.classList.add(scss["unitPage--content"]);
plan3D.classList.add(scss["unitPage--content__plan"]);
map.classList.add(scss["unitPage--content__map"]);
mapUnit.classList.add(scss["map--unit"]);
mapPreview.classList.add(scss["map--preview"]);
specs.classList.add(scss["specs"]);
area.classList.add(scss["specs--area"]);
plan.classList.add(scss["plan"]);
specsGrid.classList.add(scss["specs--grid"]);

const unit = new Unit(
  data[0],
  back,
  area,
  specsGrid,
  plan,
  plan3D,
  mapPreview,
  mapUnit
);

unit.render();
unit.navigation();

// header generator
header.classList.add(scss["header"]);
header.appendChild(imageTagGenerator(logo));
header.appendChild(
  tagGenerator("h3")({
    content: "New Capital - MU2 - 62",
    classes: [scss["header--label"]],
  })
);
// footer generator
footer.classList.add(scss["footer"]);
counterWrapper.classList.add(scss["counter"]);
counterWrapper.classList.add(scss["unit"]);
const unitName = unit.getUnitNumber;
counterWrapper.appendChild(
  tagGenerator("h2")({
    content: unitName,
  })
);
