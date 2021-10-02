import "../styles.scss";

export default class Modal {
  constructor(projectData, wrapper) {
    this.buildingFloors = projectData.floors;
    this.wrapper = wrapper;
  }

  generateModalOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "modal_overlay";
    return overlay;
  }

  generateModal() {
    const modal = document.createElement("form");
    modal.className = "modal";
    modal.id = "modalForm";
    return modal;
  }
  generateModalBody() {
    const body = document.createElement("div");
    body.className = "modal--body";
    return body;
  }

  handlefloorName(floorId) {
    switch (floorId) {
      case 0:
        return {
          fullName: "Ground",
          shortName: "G",
        };
      case 1:
        return {
          fullName: "First",
          shortName: "F",
        };
      case 2:
        return {
          fullName: "Secound",
          shortName: "S",
        };
    }
  }

  static handleRadioButtonChange = (e) => {
    const radio = e.target;
    const radiosWrapper = radio.parentElement.parentElement;
    const radioInputContainer = radio.parentElement;
    radiosWrapper
      .querySelectorAll(".radio")
      .forEach((radio) => radio.classList.remove("selected"));
    if (radioInputContainer.classList.contains("selected")) {
      radioInputContainer.className = "radio";
    } else {
      radioInputContainer.className = "radio selected";
    }
  };

  triggerError(form, message) {
    const searchInput = form.querySelector(".search--input");
    const errorBlock = form.querySelector(".error--block");
    searchInput.classList.add = "error";
    errorBlock.innerText = message;
  }

  static openModal() {
    const modalOverlay = document.getElementById("modal_overlay");
    modalOverlay.style.display = "flex";
  }

  static closeModal() {
    const modalOverlay = document.getElementById("modal_overlay");
    modalOverlay.style.display = "none";
  }

  static outsideClick(e) {
    const modalOverlay = document.getElementById("modal_overlay");
    if (e.target == modalOverlay) {
      modalOverlay.style.display = "none";
    }
  }

  static handleModalFormSubmit = (e) => {
    e.preventDefault();
    const modalForm = document.querySelector("#modalForm");
    const selectedFloor = modalForm.querySelector(
      'input[name="floor"]:checked'
    ).value;
    const unit = modalForm.querySelector('input[name="unit"]').value;
    if (!unit) {
      triggerError(modalForm, "unit name is required");
      return;
    } else if (!selectedFloor) {
      triggerError(modalForm, "floor must be selected");
      return;
    } else {
      console.log({ selectedFloor, unit });
    }
    window.location.href = `floor.html?floor=${selectedFloor}&unit=${unit}`;
  };

  generateRadioWrapper() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("modal--body__radios");
    return wrapper;
  }

  generateRadios(floors) {
    let radios = [];
    floors.forEach((floor) => {
      const radio = document.createElement("label");
      radio.classList.add("radio");
      const radioButton = document.createElement("button");
      radioButton.classList.add("radio--button");

      const radioInput = document.createElement("input");
      radioInput.classList.add("radio--input");
      radioInput.setAttribute("type", "radio");
      radioInput.setAttribute("required", true);
      radioInput.setAttribute("name", "floor");
      radioInput.setAttribute("value", floor.floor);
      if (floor.floor === 0) {
        radioButton.innerText = `${this.handlefloorName(floor.floor).fullName}`;
      } else {
        radioButton.innerText = `Floor ${floor.floor}`;
      }
      radio.appendChild(radioButton);
      radio.appendChild(radioInput);
      radios.push(radio);
    });
    return radios;
  }

  generateSearchInput() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("modal--body__search");
    const errorBlock = document.createElement("small");
    errorBlock.classList.add("error--block");
    const searchInput = document.createElement("input");
    searchInput.classList.add("search--input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "unit name");
    searchInput.setAttribute("required", true);
    searchInput.setAttribute("name", "unit");
    wrapper.appendChild(searchInput);
    wrapper.appendChild(errorBlock);
    return wrapper;
  }

  generateControls() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("modal--body__controls");

    const submitButton = document.createElement("button");
    submitButton.classList.add("submit--button");
    submitButton.setAttribute("type", "submit");
    submitButton.innerText = "Find unit";
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel--button");
    cancelButton.innerText = "Cancel";
    cancelButton.setAttribute("type", "button");
    cancelButton.setAttribute("type", "button");
    wrapper.appendChild(submitButton);
    wrapper.appendChild(cancelButton);
    return wrapper;
  }

  render() {
    const Modal = this.generateModal();
    const Overlay = this.generateModalOverlay();
    const ModalBody = this.generateModalBody();
    const RadioWraper = this.generateRadioWrapper();
    const radios = this.generateRadios(this.buildingFloors);
    radios.forEach((radio) => {
      RadioWraper.appendChild(radio);
    });
    const searchElement = this.generateSearchInput();
    const controls = this.generateControls();
    ModalBody.appendChild(RadioWraper);
    ModalBody.appendChild(searchElement);
    ModalBody.appendChild(controls);
    Modal.appendChild(ModalBody);
    Overlay.appendChild(Modal);
    this.wrapper.appendChild(Overlay);
  }
}
