import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateQuizDto {
    
    @IsString({ message: "O texto deve ser string" })
    @IsNotEmpty({ message: "Otexto não pode estar vazio" }) 
    @MaxLength(100, { message: "Título deve conter menos de 100 caracteres" })
    readonly text: string;

    @IsArray({ message: "O options deve ser um array" })
    @ArrayNotEmpty({ message: "O array não pode ser vazio" })
    @ArrayMaxSize(5, { message: "O options deve ter no máximo 10 alternativas" })
    @IsString({ each: true, message: "Cada opção deve ser uma string" })
    @MaxLength(100, { each: true, message: "Cada opção deve ter no máximo 100 caracteres" })
    readonly options: string[];

    @IsString({ message: "A dificuldade deve ser string" })
    @IsNotEmpty({ message: "dificuldade não pode estar vazio" }) 
    @MaxLength(20, { message: "dificuldade deve conter menos de 20 caracteres" })
    readonly difficulty: string;

    @IsString({ message: "fonte deve ser string" })
    @MaxLength(50, { message: "fonte deve conter menos de 50 caracteres" })
    readonly theme: string;

}