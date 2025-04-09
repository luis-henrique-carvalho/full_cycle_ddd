import Order from "../entity/order";

export default class OrderService {
  static getTotal(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0);
  }
}
