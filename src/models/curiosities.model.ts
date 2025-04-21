import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName:"curiosities",
    timestamps:false
})
export class Curiosities extends Model<Curiosities>{
    @Column({
        type: DataType.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    })
    id:number;

    @Column({
        type: DataType.STRING(100),
        allowNull:false,
    })
    title:string;

    @Column({
        type: DataType.STRING(100),
        allowNull:false,
    })
    caption:string;

    @Column({
        type: DataType.STRING(50),
        allowNull:false,
    })
    author:string;

    @Column({
        type: DataType.STRING(50),
    })
    font: string;

    @Column({
        type: DataType.STRING(100),
    })
    description:string;
}
