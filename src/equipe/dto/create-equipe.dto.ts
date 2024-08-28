import { IsNotEmpty, IsString } from "class-validator";

export class CreateEquipeDto {
    @IsString()
    @IsNotEmpty()
    readonly nome: string;
}
