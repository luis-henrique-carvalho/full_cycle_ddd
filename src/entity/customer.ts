class Customer {
  _id: string;
  _name: string = "";
  _email: string = "";
  _active: boolean = true;
  _address: string = "";

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
  }

  validate() {
    if (this._name.length < 0) {
      throw new Error("Invalid customer name");
    }
    if (this._id.length < 0) {
      throw new Error("Invalid customer id");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    this._active = true;
  }

  desactivate() {
    this._active = false;
  }
}
