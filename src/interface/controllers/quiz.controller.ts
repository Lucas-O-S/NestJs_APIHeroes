import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { CreateQuizDto } from "../dtos/quiz/quizCreate.dto";
import { QuizService } from "src/application/services/quiz.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { GetQuizDto } from "../dtos/quiz/quizget.dto";

@Controller("quiz")
export class QuizController {
    constructor(
        private readonly quizService: QuizService
    ){}

    @Post()
    @ApiOperation({ summary: 'Cria um nova pergunta do quiz' })
    @ApiResponse({ status: 201, description: 'Question criado com sucesso' })
    @ApiResponse({ status: 500, description: 'Erro inesperado ao registrar estúdio' })
    async registro(@Body() quizDto: CreateQuizDto): Promise<ApiResponseInterface> {
        try {
          const result = await this.quizService.createQuestion(quizDto);
          return result;
        } catch (error) {
          return {
            status: 500,
            message: 'Erro inesperado ao registrar estúdio.',
            error: error.message || error,
          };
        }
    }

    @Get('find-question-quiz')
    @ApiOperation({ summary: 'Busca as questões conforme nivel e tipo'})
    @ApiResponse({ status: 200, description: 'Busca efetuada com sucesso'})
    @ApiResponse({ status: 500, description: 'Erro ao buscar questões'})
    async getQuestionsQuiz(@Body() data: GetQuizDto): Promise<ApiResponseInterface>{
        try{
            const dataQuestions = await this.quizService.getQuestionsByThemeAndByLevel(data);
            return dataQuestions;
        } catch(error){
            return{
                status: 500,
                message: 'Erro ao buscar questões',
                error: error.message || error
            }
        }
    }
}