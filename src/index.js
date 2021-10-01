import data from "../data/data.json";
import scss from "./styles.module.scss";
import logo from "./assets/svgs/logo.svg";
import ronzaLogo from "./assets/svgs/ronza_logo.svg";
import ronzaBuilding from "./assets/images/building-background.jpg";
import Building from "./models/building";
import authentication from "./auth";
import { imageTagGenerator, tagGenerator } from "./helpers";

const app = document.getElementById("app");
const navigation = document.getElementById("navigation");
const header = document.getElementById("navigation__header");
const anchorsWrapper = document.getElementById("navigation__anchors");
const footer = document.getElementById("navigation__footer");
const counterWrapper = document.getElementById("counter");

navigation.classList.add(scss["building--navigation"]);
app.classList.add(scss["building"]);

if (authentication.window) {
  const ronza = new Building(
    data[0],
    ronzaBuilding,
    counterWrapper,
    anchorsWrapper,
    app
  );

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
  anchorsWrapper.classList.add(scss["building--navigation__anchors"]);
  // footer generator
  footer.classList.add(scss["footer"]);
  counterWrapper.classList.add(scss["counter"]);
  footer.insertAdjacentElement("afterbegin", imageTagGenerator(ronzaLogo));

  ronza.render();
} else {
  authentication.generateExpiredContent();
}
