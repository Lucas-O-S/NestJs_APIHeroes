import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as CryptoJS from 'crypto-js';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private config: ConfigService,
    ) {}

    async generateHash(pass: string): Promise<any>{
        try{
            const saltRounds = this.config.get('SALT_ROUNDS')

            if (!saltRounds) {
                throw new Error("A variável de ambiente SALT_ROUNDS não está configurada.");
            }

            const salt = await bcrypt.genSalt(parseInt(saltRounds));
            const hashedPassword = await bcrypt.hash(pass, salt);

            return hashedPassword;
        }catch(error){
            console.error("Erro ao gerar o hash da senha:", error);
            throw new Error("Erro ao processar a senha.");
        }
    }

    async validatyPassword(pass: string, hash: string): Promise<any>{
        try{
            return await bcrypt.compare(pass, hash);

        }catch(error){

        }
        
    }

    async generateToken(userData: any, role: any): Promise<any>{
        try{
            const payload = {
                sub: userData.id,
                username: userData.fullname,
                role: role.role,
                nickname: userData.nickname,
                access: role.access,
            };

            const accessToken = await this.jwtService.signAsync(payload, {
                expiresIn: '1h',
            });

            return accessToken; 
        }catch(error){

        }
    }

    async generateRefreshToken(userData: any): Promise<any> {
        try {
            const payload = { sub: userData.userId, username: userData.username };
            
            // Configuração específica para o refresh token
            const refreshToken = await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret', 
                expiresIn: '1d', 
            });
    
            return refreshToken;
        } catch (error) {
            console.error('Erro ao gerar refresh token:', error);
            throw new Error('Não foi possível gerar o refresh token.');
        }
    }
    
}
