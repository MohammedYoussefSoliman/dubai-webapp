import scss from "../styles.module.scss";
import { imageTagGenerator, tagGenerator, getSearchQuery } from "../helpers";

export default class Floor {
  constructor(buildingData) {
    this.floorNumber = getSearchQuery("floor");
    this.buildingData = buildingData;
    this.floor = buildingData.floors.find(
      (floor) => floor.floor == this.floorNumber
    );
  }

  render() {
    const { buildingData, floorNumber, floor } = this;

    console.log(floor);
  }
}
