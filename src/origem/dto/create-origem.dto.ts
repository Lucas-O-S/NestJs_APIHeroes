import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrigemDto {
    @IsString()
    @IsNotEmpty()
    readonly nome: string;
}
