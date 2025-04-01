export default class OrderItem {
  _id: string;
  _name: string;
  _price: number;
  _orderId: string;

  constructor(id: string, name: string, price: number, orderId: string) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._orderId = orderId;
  }
}
