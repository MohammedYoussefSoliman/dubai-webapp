export default class Unit {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  render() {
    console.log(this.id, this.name);
  }
}
