import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import { v4 as uuid } from "uuid";

export default class OrderService {
  static getTotal(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("Items quantity should be greater than 0");
    }

    const order = new Order(uuid(), customer.id, items);

    customer.addRewardPoints(order.total() / 2);

    return order;
  }
}
