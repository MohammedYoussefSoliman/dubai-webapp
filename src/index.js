import Unit from "./unit";
import data from "../data/data.json";
import scss from "./styles.module.scss";
import logo from "./assets/logo.svg";

// console.log(data);

const newUnit = new Unit(401, "unit admin");

newUnit.render();

function setScss() {
  const body = document.querySelector("body");
  const div = document.createElement("div");
  div.classList.add(scss["colored--container"]);
  div.innerHTML = `<image src=${logo} />`;
  body.appendChild(div);
}

setScss();
