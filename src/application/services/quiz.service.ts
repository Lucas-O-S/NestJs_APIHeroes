import { Injectable } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { CreateQuizDto } from "src/interface/dtos/quiz/quizCreate.dto";
import { CreateQuestionUseCase } from "../use-cases/quiz/create-question.use-case";
import { FindQuestionsByTheme } from "../use-cases/quiz/find-questions-by-theme";
import { GetQuizDto } from "src/interface/dtos/quiz/quizget.dto";

@Injectable()
export class QuizService {
    
    constructor(
        private readonly createQuizUseCase: CreateQuestionUseCase,
        private readonly findQuestionsByTheme: FindQuestionsByTheme
    ){}

    async createQuestion(questionDTO: CreateQuizDto): Promise<ApiResponseInterface<string>>{
        return await this.createQuizUseCase.createQuestion(questionDTO);
    }

    async getQuestionsByThemeAndByLevel(dataDto: GetQuizDto): Promise<ApiResponseInterface>{
        return await this.findQuestionsByTheme.findQuestionsByThemeAndByLevel(dataDto);
    }
}