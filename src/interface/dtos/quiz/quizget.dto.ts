import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class GetQuizDto {

    @IsString({ message: "A dificuldade deve ser string" })
    @IsNotEmpty({ message: "dificuldade não pode estar vazio" }) 
    @MaxLength(20, { message: "dificuldade deve conter menos de 20 caracteres" })
    readonly difficulty: string;

    @IsString({ message: "fonte deve ser string" })
    @MaxLength(50, { message: "fonte deve conter menos de 50 caracteres" })
    readonly theme: string;

}