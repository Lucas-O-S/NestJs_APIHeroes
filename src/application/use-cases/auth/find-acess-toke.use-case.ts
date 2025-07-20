import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Response } from 'express';
import { TokenUseCase } from "./token.use-case";
import { AuthRepository } from "src/infrastructure/repositories/auth.repository";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";

@Injectable()
export class FindAccessTokenUseCase {
    
    constructor(
        private readonly tokenUseCase: TokenUseCase,
        private readonly authRepository: AuthRepository
    ){}

    async findAccessToken(req, res): Promise<ApiResponseInterface<string>>{
        const token = req.cookies['refresh_token'];

        if (!token) {
            throw new UnauthorizedException('Refresh token ausente');
        }
    
        const payload = await this.tokenUseCase.verifyRefreshToken(token);
        const user = await this.authRepository.findUserById(payload.sub);
    
        const newAccessToken = await this.tokenUseCase.generateToken(user, payload.role);
    
        return {
            status: HttpStatus.OK,
            message: "Token pego com sucesso.",
            dataUnit: newAccessToken
        }
    }
}