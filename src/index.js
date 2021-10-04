import { background } from "./assets/images";
import Modal from "./models/modal";
import Building from "./models/building";
import authentication from "./auth";
import data from "../data/data.json";

const app = document.getElementById("app");
const navigationContainer = document.getElementById("navigation");

const dubaiBuilding = new Building(
  data[0],
  background,
  app,
  navigationContainer
);
const UnitSearchModal = new Modal(data[0], app);
dubaiBuilding.render();
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
// if (authentication.window) {
//   const ronza = new Building(
//     data[0],
//     background,
//     counterWrapper,
//     anchorsWrapper,
//     app
//   );

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
//   anchorsWrapper.classList.add(scss["building--navigation__anchors"]);
//   // footer generator
//   footer.classList.add(scss["footer"]);
//   counterWrapper.classList.add(scss["counter"]);
//   footer.insertAdjacentElement("afterbegin", imageTagGenerator(ronzaLogo));

//   ronza.render();
// } else {
//   authentication.generateExpiredContent();
// }
