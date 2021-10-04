import Floor from "./models/floor";
import Modal from "./models/modal";
import authentication from "./auth";
import data from "../data/data.json";

const app = document.getElementById("app");

//floor
const floor = new Floor(data[0], app);
floor.render();
// search modal
const UnitSearchModal = new Modal(data[0], app);
UnitSearchModal.render();

const modalBtn = document.getElementById("search_button");
const modalForm = document.getElementById("modalForm");
const cancelButton = modalForm.querySelector(".cancel--button");
const radioButtons = modalForm.querySelectorAll(".radio--input");

window.addEventListener("click", Modal.outsideClick);
modalBtn.addEventListener("click", Modal.openModal);
cancelButton.addEventListener("click", Modal.closeModal);

radioButtons.forEach((radio) => {
  radio.addEventListener("click", Modal.handleRadioButtonChange);
});
modalForm.addEventListener(
  "submit",
  Modal.handleModalFormSubmit(data[0].floors),
  false
);

document.addEventListener("DOMContentLoaded", () => {
  app.appendChild(Floor.floorLoadingScreen());
  setTimeout(() => {
    app.removeChild(document.querySelector(".loading--page"));
  }, 3000);
});
