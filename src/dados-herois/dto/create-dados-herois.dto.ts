import { Transform } from "class-transformer";
import {IsDate, IsNotEmpty, IsString, MinDate, MinLength} from "class-validator";

export class CreateDadosHeroisDto {
    @IsString({message: "name deve ser string"})
    @MinLength(2, {message: "name deve Conter mais de dois caracteres"})
    readonly name: string;

    @IsString({message: "studio deve ser string"})
    @MinLength(2, {message: "studio deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "studio não pode estar vazio"})
    readonly studio: string;



    @IsString({message: "powerType deve ser string"})
    @MinLength(2, {message: "powerType deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "powerType, não pode estar vazio"})
    readonly powerType: string;


    @IsString({message: "morality deve ser string"})
    @MinLength(2, {message: "morality deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "morality não pode estar vazio"})
    readonly morality: string;


    @IsString({message: "firstAppearance deve ser string"})
    @MinLength(2, {message: "firstAppearance deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "firstAppearance não pode estar vazio"})
    readonly firstAppearance:  string;

    @IsDate()
    @MinDate(new Date("1753-01-01"), {message: "Valor invalido, escolha uma data futura"})
    @Transform(({ value }) => new Date(value)) 
    readonly realeseDate: Date;

    
    @IsString({message: "creator deve ser string"})
    @MinLength(2, {message: "creator deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "creator não pode estar vazio"})
    readonly creator: string;

    
    @IsString({message: "weakPoint deve ser string"})
    @MinLength(2, {message: "weakPoint deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "weakPoint não pode estar vazio"})
    readonly weakPoint: string;

    
    @IsString({message: "afiliation deve ser string"})
    @MinLength(2, {message: "afiliation deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "afiliation não pode estar vazio"})
    readonly afiliation: string;

    
    @IsString({message: "story deve ser string"})
    @MinLength(2, {message: "story deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "story não pode estar vazio"})
    readonly story: string;

    //variaveis para salvar as imagens
    image?: Express.Multer.File;
    converImage?: Express.Multer.File;

}
