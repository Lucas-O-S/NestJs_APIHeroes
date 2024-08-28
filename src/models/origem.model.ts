import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Origens extends Model<Origens> {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  nome: string;
}