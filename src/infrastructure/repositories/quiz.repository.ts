import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Quiz } from "../database/sequelize/models/quiz.model";
import { CreateQuizDto } from "src/interface/dtos/quiz/quizCreate.dto";
import { Op } from "sequelize";

@Injectable()
export class QuizRepository {

    constructor(
        @InjectModel(Quiz) private readonly quizModel: typeof Quiz
    ){}

    async createQuiz(questionDTO: CreateQuizDto): Promise<Quiz> {
        return await this.quizModel.create(questionDTO)
    }

    async findQuestionsByThemeAndByLevel(theme: string, difficulty: string): Promise<Quiz[]> {
        return await this.quizModel.findAll({
            where: {
                theme: theme,
                difficulty: difficulty
            }
        });
    }
}