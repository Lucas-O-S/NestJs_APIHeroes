import { HttpStatus, Injectable } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { ArticlesRepository } from "src/infrastructure/repositories/articles.repository";

@Injectable()
export class DeleteArticleUseCase {

    constructor(private readonly articlesRepository: ArticlesRepository){}

    async deleteArticle(id: number): Promise<ApiResponseInterface<number>> {
        const deleteArticle = await this.articlesRepository.DeleteArticle(id);

        if(deleteArticle !== 1){
            return {
                status: HttpStatus.NOT_FOUND,
                message: "Ouve um erro ao remover o ApiUriTooLongResponse."
            }
        }

        return {
            status: HttpStatus.OK,
            message: "Artigo excluido com sucesso."
        }
    }
}