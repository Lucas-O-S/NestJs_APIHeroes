import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Moralidades extends Model<Moralidades> {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  nome: string;
}