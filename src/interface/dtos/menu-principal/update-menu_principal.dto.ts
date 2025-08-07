import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuPrincipalDto } from './create-menu_principal.dto';

export class UpdateMenuPrincipalDto extends PartialType(CreateMenuPrincipalDto) {}
