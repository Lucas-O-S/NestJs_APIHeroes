import { IsNotEmpty, IsString } from "class-validator";

export class CreateMoralidadeDto {
    @IsString()
    @IsNotEmpty()
    readonly nome: string;
}
