import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as CryptoJS from 'crypto-js';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private config: ConfigService,
    ) {}

    async generateHash(pass: string): Promise<any>{
        try{
            const encryptionKey = this.config.get('ENCRYPTION_KEY')
            const saltRounds = this.config.get('SALT_ROUNDS')

            if (!encryptionKey || !saltRounds) {
                throw new Error("As variáveis de ambiente ENCRYPTION_KEY ou SALT_ROUNDS não estão configuradas.");
            }

            const decryptedPassword = CryptoJS.AES.decrypt(pass, encryptionKey).toString(CryptoJS.enc.Utf8);

            const salt = await bcrypt.genSalt(parseInt(saltRounds));
            const hashedPassword = await bcrypt.hash(decryptedPassword, salt);

            return hashedPassword;
        }catch(error){
            console.error("Erro ao gerar o hash da senha:", error);
            throw new Error("Erro ao processar a senha.");
        }
    }

    async validatyPassword(pass: string, hash: string): Promise<any>{
        try{
            const encryptionKey = this.config.get('ENCRYPTION_KEY')
            if (!encryptionKey) {
                throw new Error("Chave de encriptação não configurada.");
            }

            const decryptedPassword = await CryptoJS.AES.decrypt(pass, encryptionKey).toString(CryptoJS.enc.Utf8);

            return await bcrypt.compare(decryptedPassword, hash);

        }catch(error){

        }
        
    }

    async generateToken(userData: any): Promise<any>{
        try{
            const payload = { sub: userData.userId, username: userData.username };
            const accessToken = await this.jwtService.signAsync(payload);

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
