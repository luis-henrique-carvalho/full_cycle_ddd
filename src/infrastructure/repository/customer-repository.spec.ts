import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/customer/entity/customer";
import CustomerRepository from "./customer-repository";
import Address from "../../domain/customer/value-object/address";
describe("Customer repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zip 1", "City 1");
    customer.address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: "1" },
    });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      street: customer.address.street,
      number: customer.address.number,
      zip: customer.address.zip,
      city: customer.address.city,
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zip 1", "City 1");
    customer.address = address;

    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    customer.address = new Address("Street 2", 2, "Zip 2", "City 2");

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: "1" },
    });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      street: customer.address.street,
      number: customer.address.number,
      zip: customer.address.zip,
      city: customer.address.city,
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zip 1", "City 1");
    customer.address = address;

    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.find("1");

    expect(foundCustomer).toEqual(customer);
  });

  it("should throw an error when customer not found", async () => {
    const customerRepository = new CustomerRepository();

    await expect(customerRepository.find("1")).rejects.toThrow(
      "Customer not found"
    );
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("1", "Customer 1");
    const address1 = new Address("Street 1", 1, "Zip 1", "City 1");
    customer1.address = address1;

    const customer2 = new Customer("2", "Customer 2");
    const address2 = new Address("Street 2", 2, "Zip 2", "City 2");
    customer2.address = address2;

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
