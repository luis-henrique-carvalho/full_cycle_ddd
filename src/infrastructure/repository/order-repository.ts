import Order from "../../domain/checkout/entity/order";
import OrderItem from "../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../domain/checkout/repository/order-repository-interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel, as: "items" }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Order> {
    try {
      const orderModel = await OrderModel.findOne({
        where: { id },
        include: ["items"],
      });

      if (!orderModel) {
        throw new Error("Order not found");
      }

      const orderItems = orderModel.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.productId,
            item.quantity
          )
      );

      return new Order(orderModel.id, orderModel.customerId, orderItems);
    } catch (error) {
      throw new Error(`Error finding order: ${error}`);
    }
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ["items"],
    });

    return orderModels.map((orderModel) => {
      const orderItems = orderModel.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.productId,
            item.quantity
          )
      );
      return new Order(orderModel.id, orderModel.customerId, orderItems);
    });
  }
}
