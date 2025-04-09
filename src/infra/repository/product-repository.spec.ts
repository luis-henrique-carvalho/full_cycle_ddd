import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
describe("Product repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
