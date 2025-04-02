import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Order("", "1", [])).toThrowError("Invalid order id");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => new Order("1", "", [])).toThrowError("Invalid customer id");
  });

  it("should throw error when items is empty", () => {
    expect(() => new Order("1", "1", [])).toThrowError(
      "Items quantity should be greater than 0"
    );
  });

  it("should calculate total", () => {
    const order = new Order("1", "1", [
      new OrderItem("1", "1", 100, "1"),
      new OrderItem("2", "1", 200, "1"),
    ]);

    expect(order.total()).toBe(300);
  });
});
