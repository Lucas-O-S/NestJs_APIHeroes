import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException, UsePipes, ParseIntPipe } from '@nestjs/common';
import { DadosHeroisService } from './dados-herois.service';
import { CreateDadosHeroisDto } from './dto/create-dados-herois.dto';
import { UpdateDadosHeroisDto } from './dto/update-dados-herois.dto';
import {Heroes} from '../models/heroes.model';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MinFileSizeValidator } from 'src/validators/min_file.validator';

@Controller('herois')
export class DadosHeroisController {
  constructor(private readonly dadosHeroisService: DadosHeroisService) {}

  @UseInterceptors(FilesInterceptor("imagens"))
  @Post()
  async insere(
    //Salva as variaveis do body dentro do dto
    @Body() createDadosHeroisDto: CreateDadosHeroisDto,
    //Recebe arquivos enviados dentro da arranjo "imagens" 
    @UploadedFiles(new ParseFilePipe({
      validators: [
        //Verifica se é jpeg ou png e depois se tem no maximo 65 kb
        new FileTypeValidator({ fileType: /(image\/jpeg|image\/png)/ }),
        new MaxFileSizeValidator({maxSize: 1024 * 1000 * 65}),
        new MinFileSizeValidator({ minSize: 1024 }), 
      ]
    })) imagens: Express.Multer.File[])
  {
    try{

      //Verifica se foi enviado duas imagens
      if(imagens.length > 2 || imagens.length < 2){
        throw new BadRequestException("Deve ser enviado duas imagens");
      }
      //Salva no dto
      createDadosHeroisDto.image1 = imagens[0];
      createDadosHeroisDto.image2 = imagens[1];

      //Resultado temporario para teste
      const result = await this.dadosHeroisService.create(createDadosHeroisDto);
      return {"message": `${createDadosHeroisDto.name} foi criado com sucesso` , "result": result};
    }
    catch(ex){
      throw new BadRequestException(ex.message);
      //throw new BadRequestException("Erro ao adicionar heroi");
    }


  }
/*
  @Get('heroesByPublisher')
  async getHeroesByPublisher(@Query('publisher') publisher: number): Promise<Heroes[]> {
    return this.dadosHeroisService.getHeroesByPublisher(publisher);
  }
    */
}
