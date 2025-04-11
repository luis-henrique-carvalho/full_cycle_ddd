import { Sequelize } from "sequelize-typescript";
import OrderModel from "../db/sequelize/model/order.model";
import Order from "../../domain/entity/order";
import OrderRepository from "./order-repository";
import Address from "../../domain/entity/address";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer-repository";
import Customer from "../../domain/entity/customer";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product-repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import OrderItemModel from "../db/sequelize/model/order-item.model";
describe("Order repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zip 1", "City 1");
    customer.address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderRepository = new OrderRepository();
    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel).toBeDefined();
    expect(orderModel?.toJSON()).toEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          product_id: orderItem.productId,
          quantity: orderItem.quantity,
        },
      ],
    });
  });

  it("should update a order", async () => {});

  it("should find a order", async () => {});

  it("should throw an error when order not found", async () => {
    const orderRepository = new OrderRepository();

    await expect(orderRepository.find("1")).rejects.toThrow("Order not found");
  });

  it("should find all orders", async () => {});
});
