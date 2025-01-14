import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/components/user/user.service';
import * as CryptoJS from 'crypto-js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) {}


    async generateHash(pass: string): Promise<any>{
        try{
            const encryptionKey = process.env.ENCRYPTION_KEY;
            const saltRounds = process.env.SALT_ROUNDS;

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


    async signIn(email: string, pass: string): Promise<any> {
        try{
            const encryptionKey = process.env.ENCRYPTION_KEY;
            if (!encryptionKey) {
                throw new Error("Chave de encriptação não configurada.");
            }

            const user = await this.usersService.findOneUser(email);
            if (!user) {
                throw new Error("Usuário não encontrado.");
            }

            const decryptedPassword = await CryptoJS.AES.decrypt(pass, encryptionKey).toString(CryptoJS.enc.Utf8);

            const match = await bcrypt.compare(decryptedPassword, user.password);

            if (!match) {
                throw new Error("Credenciais inválidas.");
            }

            const payload = { sub: user.userId, username: user.username };
            const accessToken = await this.jwtService.signAsync(payload);

            return { access_token: accessToken };
            
        }catch(error){
            console.error("Erro ao realizar login:", error.message);

            return {
            status: 401,
            message: "Credenciais inválidas ou usuário não encontrado.",
            };
        }
    
    }
}
