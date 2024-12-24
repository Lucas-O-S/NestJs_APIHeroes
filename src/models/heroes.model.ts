import { timestamp } from 'rxjs';
import { Table, Column, Model, DataType} from 'sequelize-typescript';

@Table({
  tableName: "heroes",
  timestamps: false,
})
export class Heroes extends Model<Heroes> {
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
      allowNull: false,
  })
  name : string;

  //@ForeignKey(() => studios)
  @Column({
      type: DataType.NUMBER,
      allowNull: false,
  })
  studio_id: number;

  @Column({
      type: DataType.STRING,
      allowNull: true,
  })
  power_type: string;

  @Column({
      type: DataType.STRING,
      allowNull: true,
  })
  morality: string;

  @Column({
      type: DataType.STRING,
      allowNull: true,
  })
  first_appearance: string;

  @Column({
      type: DataType.DATE,
      allowNull: true,
  })
  release_date: Date;

  @Column({
      type: DataType.STRING,
      allowNull: true,
  })
  creator: string;

  @Column({
      type: DataType.STRING,
      allowNull: true,
  }) 
  weak_point: string;

  @Column({
      type: DataType.STRING,
      allowNull: true,
  })
  affiliation: string;

  @Column({
      type: DataType.STRING,
      allowNull: true,
  })
  story: string;

  //@ForeignKey (() => teams)
  @Column({
      type: DataType.INTEGER,
      allowNull: true,
  })
  team: number  

  @Column({
      type: DataType.STRING,
      allowNull: true,
  })
  genre: string;

  @Column({
      type: DataType.BLOB,
      allowNull: true,
  })
  image1: Express.Multer.File;

  @Column({
      type: DataType.BLOB,
      allowNull: true,
  })
  image2: Express.Multer.File;

}