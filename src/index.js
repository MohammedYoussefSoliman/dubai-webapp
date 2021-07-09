import Unit from "./unit";
import data from "../data/data.json";
import scss from "./styles.module.scss";
import "./styles.module.scss";
import logo from "./assets/svgs/logo.svg";
import ronzaBuilding from "./assets/images/building-background.jpg";
import Building from "./building";
import { imageTagGenerator, tagGenerator } from "./helpers";

const app = document.getElementById("app");
const navigation = document.getElementById("navigation");
const anchors = document.getElementById("navigation__anchors");
const footer = document.getElementById("navigation__footer");
navigation.classList.add(scss["building--navigation"]);
app.classList.add(scss["building"]);

const ronza = new Building(data[0], ronzaBuilding, app);

ronza.render();
ronza.renderNavigation();

// header generator
const header = document.getElementById("navigation__header");
header.classList.add(scss["building--navigation__header"]);
header.appendChild(imageTagGenerator(logo));
header.appendChild(
  tagGenerator("h3")({
    content: "New Capital - MU2 - 62",
    classes: [scss["header--label"]],
  })
);
// footer generator
