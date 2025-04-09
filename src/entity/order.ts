import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  validate(): void {
    if (this._id.length === 0) {
      throw new Error("Invalid order id");
    }

    if (this._customerId.length === 0) {
      throw new Error("Invalid customer id");
    }

    if (this._items.length === 0) {
      throw new Error("Items quantity should be greater than 0");
    }
  }

  total(): number {
    return this._items.reduce((total, item) => total + item.price, 0);
  }
}
