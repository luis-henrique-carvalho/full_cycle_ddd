import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Customer("", "John Doe")).toThrowError(
      "Invalid customer id"
    );
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "John Doe");
    const address = new Address("Rua 1", 1, "Springfield", "USA");

    customer.address = address;

    customer.desactivate();
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should change customer name", () => {
    const customer = new Customer("1", "John Doe");

    customer.changeName("Jane Doe");

    expect(customer.name).toBe("Jane Doe");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "John Doe");
    const address = new Address("Rua 1", 1, "Springfield", "USA");

    customer.address = address;

    customer.desactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is not set", () => {
    const customer = new Customer("1", "John Doe");

    expect(() => customer.activate()).toThrowError("Invalid customer address");
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "John Doe");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(20);
    expect(customer.rewardPoints).toBe(30);
  });
});
