export class Item {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  clone(): Item {
    return new Item(this.name);
  }
}
