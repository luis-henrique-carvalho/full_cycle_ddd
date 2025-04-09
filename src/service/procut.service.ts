import Product from "../entity/product";

export default class ProductService {
  static increasePrice(products: Product[], percentage: number): void {
    products.forEach((product) => {
      const price = product.price;
      const newPrice = price + (price * percentage) / 100;
      product.changePrice(newPrice);
    });
  }
}
