import { Transform } from "class-transformer";
import {IsDate, IsNotEmpty, IsString, MinDate, MinLength} from "class-validator";

export class CreateDadosHeroisDto {
    @IsString({message: "nome deve ser string"})
    @MinLength(2, {message: "nome deve Conter mais de dois caracteres"})
    readonly nome: string;

    @IsString({message: "estudio deve ser string"})
    @MinLength(2, {message: "estudio deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "estudio não pode estar vazio"})
    readonly estudio: string;



    @IsString({message: "Tipo de poder deve ser string"})
    @MinLength(2, {message: "Tipo de poder deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "Tipo de poder não pode estar vazio"})
    readonly tipoPoder: string;


    @IsString({message: "moralidade deve ser string"})
    @MinLength(2, {message: "moralidade deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "moralidade não pode estar vazio"})
    readonly moralidade: string;


    @IsString({message: "Primeira Aparicao deve ser string"})
    @MinLength(2, {message: "Primeira Aparicao deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "Primeira Aparicao não pode estar vazio"})
    readonly primeiraAparicao:  string;

    @IsDate()
    @MinDate(new Date("1753-01-01"), {message: "Valor invalido, escolha uma data futura"})
    @Transform(({ value }) => new Date(value)) 
    readonly dataLancamento: Date;

    
    @IsString({message: "criador deve ser string"})
    @MinLength(2, {message: "criador deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "criador não pode estar vazio"})
    readonly criador: string;

    
    @IsString({message: "fraquesa deve ser string"})
    @MinLength(2, {message: "fraquesa deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "fraquesa não pode estar vazio"})
    readonly fraquesa: string;

    
    @IsString({message: "afiliacao deve ser string"})
    @MinLength(2, {message: "afiliacao deve Conter mais de dois caracteres"})
    @IsNotEmpty({message: "afiliacao não pode estar vazio"})
    readonly afiliacao: string;

    
    @IsString({message: "historia deve ser string"})
    @MinLength(20, {message: "historia deve Conter mais de vinte caracteres"})
    @IsNotEmpty({message: "historia não pode estar vazio"})
    readonly historia: string;

    //variaveis para salvar as imagens
    image?: Express.Multer.File;
    converImage?: Express.Multer.File;

}
