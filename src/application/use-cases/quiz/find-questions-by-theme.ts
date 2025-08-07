import { HttpStatus, Injectable } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { QuizRepository } from "src/infrastructure/repositories/quiz.repository";
import { GetQuizDto } from "src/interface/dtos/quiz/quizget.dto";

@Injectable()
export class FindQuestionsByTheme {
    
    constructor(
        private readonly quizRepository: QuizRepository
    ){}

    async findQuestionsByThemeAndByLevel(dataDto: GetQuizDto): Promise<ApiResponseInterface>{
        const theme = dataDto.theme;
        const difficulty = dataDto.difficulty;
        const questions = await this.quizRepository.findQuestionsByThemeAndByLevel(theme , difficulty);

        if(!questions){
            return {
                status: HttpStatus.NOT_FOUND,
                message: "Não foram encontradas questões para busca."
            }
        }

        return {
            status: HttpStatus.OK,
            message: "Questões encontradas com sucesso.",
            dataUnit: questions
        }
    }
}