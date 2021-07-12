import scss from "../styles.module.scss";
import moment from "moment";
import { imageTagGenerator } from "../helpers";
import error from "../assets/svgs/error.svg";

export default class Auth {
  constructor(expirationDate) {
    this.expirationDate = expirationDate;
  }

  generateExpiredContent() {
    const body = document.querySelector("body");
    const app = document.getElementById("app");
    const main = document.createElement("main");
    const header = document.createElement("h2");
    main.classList.add(scss["expired"]);
    header.classList.add(scss["expired--message"]);
    main.appendChild(imageTagGenerator(error));
    main.appendChild(header);
    header.innerText =
      "This service is expired or something went wrong, please contact the service developer for more information";
    body.replaceChild(main, app);
  }
  get window() {
    const expireDate = moment(this.expirationDate);
    const nowDate = moment();
    return nowDate.isBefore(expireDate);
  }
}
