import Address from "./domain/customer/value-object/address";
import Customer from "./domain/customer/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";

let costumer = new Customer("123", "Doe");
let address = new Address("Main St", 4, "Springfield", "USA");

costumer.address = address;
costumer.activate();

const item1 = new OrderItem("1", "item1", 10, "1", 2);
const item2 = new OrderItem("2", "item2", 20, "1", 3);

const order = new Order("1", "123", [item1, item2]);
