import Address from "./address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _active: boolean = true;
  private _address!: Address;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  set address(address: Address) {
    this._address = address;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
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

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
