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
modalForm.addEventListener("submit", Modal.handleModalFormSubmit);

document.addEventListener("DOMContentLoaded", () => {
  app.appendChild(Floor.floorLoadingScreen());
  setTimeout(() => {
    app.removeChild(document.querySelector(".loading--page"));
  }, 3000);
});
// if (authentication.window) {
//   const currentFloor = new Floor(
//     data[0],
//     back,
//     searchInput,
//     shapeWrapper,
//     unitsWrapper
//   );

//   currentFloor.render();
//   currentFloor.navigation();

//   // header generator
//   header.classList.add(scss["header"]);
//   header.appendChild(imageTagGenerator(logo));
//   header.appendChild(
//     tagGenerator("h3")({
//       content: "New Capital - MU2 - 62",
//       classes: [scss["header--label"]],
//     })
//   );
//   // render anchores
//   searchWrapper.classList.add(scss["floor--navigation__search"]);
//   // footer generator
//   footer.classList.add(scss["footer"]);
//   counterWrapper.classList.add(scss["counter"]);
//   counterWrapper.appendChild(
//     tagGenerator("h2")({
//       content: currentFloor.getFloorNumber,
//     })
//   );

//   if (currentFloor.getFloorNumber === "00") {
//     contentWrapper.classList.add(scss["ground"]);
//   }
// } else {
//   authentication.generateExpiredContent();
// }
// footer.insertAdjacentElement("afterbegin", imageTagGenerator(ronzaLogo));
