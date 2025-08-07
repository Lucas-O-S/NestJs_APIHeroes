import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Heroes Platform API')
    .setDescription('Heroes Platform API for front end interaction')
    .setVersion('1.0')
    .addTag('Heroes Platform')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory, {jsonDocumentUrl: 'swagger/json',});

  app.use(express.json());

  app.enableCors({
    origin: '*', // Permite apenas o domínio do front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
  });
  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true, forbidNonWhitelisted: true}));
  
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    if (req.body && req.body.data) {
      console.log('Body:', JSON.stringify(req.body.data, null, 2));
    } else if (req.body) {
      console.log('Body:', JSON.stringify(req.body, null, 2));
    } else {
      console.log('No body provided');
    }
    next();
  });

  await app.listen(3020, '0.0.0.0', ()=>{
    console.log("API rodando na porta 3020!!!")
  });
}
bootstrap();

