import {
  Column,
  DataType,
  Table,
  Model,
  Sequelize,
} from 'sequelize-typescript';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

@Table({
  tableName: 'roles',
  timestamps: false,
})
export class Role extends Model<
  InferAttributes<Role>,
  InferCreationAttributes<Role>
> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.STRING })
  declare role: string;

  @Column({ type: DataType.INTEGER })
  declare usuario_id: number;

  @Column({ type: DataType.STRING })
  declare access: string;

  @Column({ type: DataType.DATE })
  declare created_at: CreationOptional<Date>;

  @Column({
    type: DataType.DATE,
    defaultValue: Sequelize.fn('NOW'),
  })
  declare updated_at: CreationOptional<Date>;
}
