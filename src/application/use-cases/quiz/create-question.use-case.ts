import { HttpStatus, Injectable } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { QuizRepository } from "src/infrastructure/repositories/quiz.repository";
import { CreateQuizDto } from "src/interface/dtos/quiz/quizCreate.dto";

@Injectable()
export class CreateQuestionUseCase {
    constructor(
        private readonly quizRepository: QuizRepository
    ){}

    async createQuestion(questionDTO: CreateQuizDto): Promise<ApiResponseInterface<string>> {
        await this.quizRepository.createQuiz(questionDTO);

        return {
            status: HttpStatus.OK,
            message: "Questão criado com sucesso."
        }
    }
}