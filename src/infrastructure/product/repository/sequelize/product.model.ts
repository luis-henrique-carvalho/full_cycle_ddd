import {
  Column,
  PrimaryKey,
  Table,
  Model,
  HasMany,
} from "sequelize-typescript";
import OrderItemModel from "../../../order/repository/sequelize/order-item.model";
@Table({
  tableName: "products",
  timestamps: false,
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({
    allowNull: false,
  })
  declare name: string;

  @Column({
    allowNull: false,
  })
  declare price: number;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];
}
