import ProductInterface from "./product.interface";

export default class ProductB implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Invalid product id");
    }

    if (this._name.length === 0) {
      throw new Error("Invalid product name");
    }

    if (this._price <= 0) {
      throw new Error("Invalid product price");
    }

    return true;
  }

  changeName(name: string): void {
    this.validate();
    this._name = name;
  }

  changePrice(price: number): void {
    this.validate();
    this._price = price;
  }

  get price(): number {
    return this._price * 2;
  }

  get name(): string {
    return this._name;
  }

  get id(): string {
    return this._id;
  }
}
