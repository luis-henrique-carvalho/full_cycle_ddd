import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository-interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zip: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zip: entity.address.zip,
        city: entity.address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: { id: entity.id },
      }
    );
  }
  async find(id: string): Promise<Customer> {
    try {
      const customerModel = await CustomerModel.findOne({
        where: { id },
      });

      if (!customerModel) {
        throw new Error("Customer not found");
      }

      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zip,
        customerModel.city
      );

      customer.changeAddress(address);

      if (customerModel.active) {
        customer.activate();
      }

      return customer;
    } catch (error) {
      throw new Error(`Error finding customer: ${error}`);
    }
  }

  async findAll(): Promise<Customer[]> {
    try {
      const customerModels = await CustomerModel.findAll();

      return customerModels.map((customerModel) => {
        const customer = new Customer(customerModel.id, customerModel.name);
        const address = new Address(
          customerModel.street,
          customerModel.number,
          customerModel.zip,
          customerModel.city
        );

        customer.changeAddress(address);

        if (customerModel.active) {
          customer.activate();
        }

        return customer;
      });
    } catch (error) {
      throw new Error(`Error finding all customers: ${error}`);
    }
  }
}
