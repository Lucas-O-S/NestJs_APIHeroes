import { Module } from '@nestjs/common';
import { QuizController } from "../controllers/quiz.controller";
import { models } from 'src/infrastructure/database/sequelize/models/index.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuizService } from 'src/application/services/quiz.service';
import { CreateQuestionUseCase } from 'src/application/use-cases/quiz/create-question.use-case';
import { QuizRepository } from 'src/infrastructure/repositories/quiz.repository';

@Module({
    imports: [SequelizeModule.forFeature(models)],
    controllers: [QuizController],
    providers: [
        QuizService,
        CreateQuestionUseCase,
        QuizRepository
    ],
    exports: [
        QuizService,
        QuizRepository
    ]
})
export class QuizModule {}