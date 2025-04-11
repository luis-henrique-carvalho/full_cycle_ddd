export default class OrderItem {
  private _id: string;
  private _price: number;
  private _name: string;
  private _productId: string;
  private _quantity: number;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;
    this.validate();
  }

  get price(): number {
    return this._price * this._quantity;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get productId(): string {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  validate(): void {
    if (this._id.length === 0) {
      throw new Error("Invalid order item id");
    }

    if (this._name.length === 0) {
      throw new Error("Invalid order item name");
    }

    if (this._productId.length === 0) {
      throw new Error("Invalid order item product id");
    }

    if (this._quantity <= 0) {
      throw new Error("Items quantity should be greater than 0");
    }
  }
}
