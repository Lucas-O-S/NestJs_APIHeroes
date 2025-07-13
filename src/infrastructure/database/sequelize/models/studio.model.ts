import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'studios',
  timestamps: false,
})
export class Studio extends Model<Studio> {
  
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({ 
      type: DataType.STRING(100),
      unique: true,
      allowNull: false,
    })
  name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  nationality: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  history: string;
}