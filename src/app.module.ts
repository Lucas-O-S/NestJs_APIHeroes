import { Module } from '@nestjs/common';
import {Controllers, Imports, Providers} from './config';

@Module({
  imports: Imports,
  controllers: Controllers,
  providers: Providers,
})
export class AppModule  {
}
