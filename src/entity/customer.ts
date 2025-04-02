import Address from "./address";

export default class Customer {
  _id: string;
  _name: string;
  _active: boolean = true;
  _address!: Address;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Invalid customer name");
    }
    if (this._id.length === 0) {
      throw new Error("Invalid customer id");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Invalid customer address");
    }
    this._active = true;
  }

  desactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  set address(address: Address) {
    this._address = address;
  }
}
