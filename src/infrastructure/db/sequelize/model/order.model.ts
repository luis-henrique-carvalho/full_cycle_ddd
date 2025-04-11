import {
  Column,
  PrimaryKey,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderItemModel from "./order-item.model";

@Table({
  tableName: "orders",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column({
    allowNull: false,
  })
  declare customerId: string;

  @Column({
    allowNull: false,
  })
  declare total: number;

  @BelongsTo(() => CustomerModel)
  declare customer?: CustomerModel;

  @HasMany(() => OrderItemModel)
  declare orderItems?: OrderItemModel[];
}
