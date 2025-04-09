import RepositoryInterface from "./repository-inferface";
import Product from "../entity/product";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
