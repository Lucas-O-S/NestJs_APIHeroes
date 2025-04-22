import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName:"articles",
    timestamps:false
})
export class Article extends Model<Article>{
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
    description_font:string;
}
