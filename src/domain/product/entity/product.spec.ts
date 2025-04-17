import Order from "../../checkout/entity/order";
import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrowError("Invalid product id");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("1", "", 100);
    }).toThrowError("Invalid product name");
  });

  it("should throw error when price is less than or equal to 0", () => {
    expect(() => {
      const product = new Product("1", "Product 1", 0);
    }).toThrowError("Invalid product price");
  });

  it("should change name", () => {
    const product = new Product("1", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("1", "Product 1", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});
