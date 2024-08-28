import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Editora extends Model<Editora> {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  nome: string;
}