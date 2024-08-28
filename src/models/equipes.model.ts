import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Equipe extends Model<Equipe> {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  nome: string;
}