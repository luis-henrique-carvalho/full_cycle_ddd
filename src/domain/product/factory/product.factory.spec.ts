import ProductFactory from "./product.factory";

describe("ProductFactory", () => {
  it("should be able to create a product a", () => {
    const product = ProductFactory.create("a", "Product A", 100);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(100);
    expect(product.constructor.name).toBe("Product");
  });

  it("should be able to create a product b", () => {
    const product = ProductFactory.create("b", "Product B", 100);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(200);
    expect(product.constructor.name).toBe("ProductB");
  });
});
