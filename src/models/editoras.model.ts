import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'studios',
  timestamps: false,
})
export class Editora extends Model<Editora> {
  
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({ 
      type: DataType.STRING,
      unique: true,
      allowNull: false,
    })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nationality: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  history: string;
}