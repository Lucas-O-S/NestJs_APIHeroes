import { PartialType } from '@nestjs/mapped-types';
import { CreateMoralidadeDto } from './create-moralidade.dto';

export class UpdateMoralidadeDto extends PartialType(CreateMoralidadeDto) {}
