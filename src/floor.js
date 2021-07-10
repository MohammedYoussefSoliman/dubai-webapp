import Floor from "./models/floor";
import data from "../data/data.json";
import scss from "./styles.module.scss";
import logo from "./assets/svgs/logo.svg";
import ronzaLogo from "./assets/svgs/ronza_logo.svg";
import { imageTagGenerator, tagGenerator } from "./helpers";

// floor setup

const currentFloor = new Floor(data[0]);

currentFloor.render();
