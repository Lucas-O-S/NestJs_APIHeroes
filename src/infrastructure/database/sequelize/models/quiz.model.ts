import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: "quiz",
  timestamps: false,
})
export class Quiz extends Model<Quiz> {
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
      allowNull: false,
      unique: true,
  })
  text : string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  options : string[];

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  difficulty: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  theme: string;
}