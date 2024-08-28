import { IsNotEmpty, IsString } from "class-validator";

export class CreateSexoDto {
    @IsString()
    @IsNotEmpty()
    readonly nome: string;
}
