import { Transform } from "class-transformer";
import {IsDate, IsNotEmpty, IsNumber, IsString, MinDate, MinLength} from "class-validator";

export class CreateDadosHeroisDto {
    @IsString({message: "nome deve ser string"})
    @MinLength(2, {message: "nome deve Conter mais de dois caracteres"})
    readonly name: string;

    @IsNumber({}, { message: "estudio deve ser um número" })
    @IsNotEmpty({message: "estudio não pode estar vazio"})
    @Transform(({ value }) => parseInt(value)) 
    readonly studio_id: number;

    @IsString({message: "Tipo de poder deve ser string"})
    @MinLength(2, {message: "Tipo de poder deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "Tipo de poder não pode estar vazio"})
    readonly power_type : string;


    @IsString({message: "moralidade deve ser string"})
    @MinLength(2, {message: "moralidade deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "moralidade não pode estar vazio"})
    readonly morality : string;


    @IsString({message: "Primeira Aparicao deve ser string"})
    @MinLength(2, {message: "Primeira Aparicao deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "Primeira Aparicao não pode estar vazio"})
    readonly first_appearance :  string;

    @IsDate()
    @MinDate(new Date("1753-01-01"), {message: "Valor invalido, escolha uma data futura"})
    @Transform(({ value }) => new Date(value)) 
    readonly release_date : Date;

    
    @IsString({message: "criador deve ser string"})
    @MinLength(2, {message: "criador deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "criador não pode estar vazio"})
    readonly creator : string;

    
    @IsString({message: "fraquesa deve ser string"})
    @MinLength(2, {message: "fraquesa deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "fraquesa não pode estar vazio"})
    readonly weak_point : string;

    
    @IsString({message: "afiliacao deve ser string"})
    @MinLength(2, {message: "afiliacao deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "afiliacao não pode estar vazio"})
    readonly affiliation : string;

    
    @IsString({message: "historia deve ser string"})
    @MinLength(20, {message: "historia deve Conter mais de vinte caracteres"})
    @IsNotEmpty({message: "historia não pode estar vazio"})
    readonly story : string;

    @IsNumber({}, { message: "Time deve ser um número" })
    @IsNotEmpty({message: "Time não pode estar vazio"})
    @Transform(({ value }) => parseInt(value)) 
    readonly team: number;

    @IsString({message: "genero deve ser string"})
    @MinLength(2, {message: "genero deve Conter mais de vinte caracteres"})
    @IsNotEmpty({message: "genero não pode estar vazio"})
    readonly genre : string;

    //variaveis para salvar as imagens
    image1?: Express.Multer.File;
    image2?: Express.Multer.File;

}
