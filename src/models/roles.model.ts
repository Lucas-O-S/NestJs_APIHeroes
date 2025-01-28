import { Column, DataType, Table,Model, Sequelize } from "sequelize-typescript";


@Table({
    tableName : "roles",
    timestamps: false,

})
export class Role extends Model<Role>{
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING
  })
  role: string

  @Column({
    type: DataType.INTEGER
  })
  usuario_id: number

  @Column({
    type: DataType.STRING
  })
  access: string

    @Column({
        type: DataType.DATE,
    })
    created_at: Date;
    
    @Column({
        type: DataType.DATE,
        defaultValue: Sequelize.fn('NOW') 
    })
    updated_at: Date;
}