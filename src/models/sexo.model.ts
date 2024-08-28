import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Sexo extends Model<Sexo> {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  nome: string;
}