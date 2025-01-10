import { Table, Column, Model, DataType, ForeignKey} from 'sequelize-typescript';
import { Team } from '../../../models/equipes.model';
import { Studio } from '../../../models/studio.model';

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

  @ForeignKey(() => Studio)
  @Column({
      type: DataType.NUMBER,
      allowNull: false,
  })
  studio_id: number;

  @Column({
      type: DataType.STRING,
      allowNull: false,
  })
  power_type: string;

  @Column({
      type: DataType.STRING,
      allowNull: false,
  })
  morality: string;

  @Column({
      type: DataType.STRING,
      allowNull: false,
  })
  first_appearance: string;

  @Column({
      type: DataType.DATE,
      allowNull: false,
  })
  release_date: Date;

  @Column({
      type: DataType.STRING,
      allowNull: false,
  })
  creator: string;

  @Column({
      type: DataType.STRING,
      allowNull: false,
  }) 
  weak_point: string;

  @Column({
      type: DataType.STRING,
      allowNull: false,
  })
  affiliation: string;

  @Column({
      type: DataType.STRING,
      allowNull: false,
  })
  story: string;

  @ForeignKey (() => Team)
  @Column({
      type: DataType.INTEGER,
      allowNull: false,
  })
  team: number  

  @Column({
      type: DataType.STRING,
      allowNull: false,
  })
  genre: string;

  @Column({
      type: DataType.BLOB,
      allowNull: false,
  })
  image1: Express.Multer.File;

  @Column({
      type: DataType.BLOB,
      allowNull: true,
  })
  image2: Express.Multer.File;

}