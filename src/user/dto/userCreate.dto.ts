import { Transform } from "class-transformer";
import { IsDate, IsString, MinDate, MinLength } from "class-validator";
import { IsEmail } from "sequelize-typescript";
import { IsCEP } from "src/validators/CepValidator";

export class CreateUserDTO{

    @IsString({message: "Nome deve ser string"})
    @MinLength(3, {message: "Nome deve conter mais de 3 caracteres"})
    fullname: string;
    
    @IsString({message: "Apelido deve ser string"})
    @MinLength(3, {message: "Apelido deve conter mais de 3 caracteres"})
    nickname: string;
    
    @IsDate()
    @MinDate(new Date("1753-01-01"), {message: "Valor invalido, escolha uma data futura"})
    @Transform(({ value }) => new Date(value))
    bithdate: Date;
    
    @IsString({message: "Telefone deve ser string"})
    @IsEmail
    firstEmail: string;
    
    @IsString({message: "Telefone deve ser string"})
    @IsEmail
    secondEmail: string;
    
    @IsString({message: "logradouro deve ser string"})
    logradouro: string;
    
    @IsString({message: "address deve ser string"})
    address: string;
    
    @IsString({message: "complemento deve ser string"})
    complement: string;
    
    @IsString({message: "CEP deve ser string"})
    @IsCEP({message: "cep invalido"})
    cep : string;
    
    @IsString({message: "bairro deve ser string"})
    state: string;
    
    @IsString({message: "cidade deve ser string"})
    city: string;
}