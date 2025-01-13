import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/components/user/user.service';
import * as CryptoJS from 'crypto-js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtToken: JwtService
    ) {}

  async genarateHash(password: string): Promise<any>{
    try{
        const decryptedPassword = CryptoJS.AES.decrypt(password, process.env.ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        
        if (!decryptedPassword) {
            throw new Error('Erro ao desencriptografar a senha!');
        }

        // Gerar o hash da senha usando bcrypt
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS) || 10)
        const hashedPassword = await bcrypt.hash(decryptedPassword, salt)

        // retorna o hash
        return hashedPassword;

    }catch(error){

    }
    
  }  

  async signIn(email: string, pass: string): Promise<any> {
    try{
        //busca os dados do usuario
        const user = await this.userService.findOneUser(email);

        //converte a senha em hash
        const decryptedPassword = await CryptoJS.AES.decrypt(pass, process.env.ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);

        const  match  =  await  bcrypt . compare ( decryptedPassword ,  user.password ) ;

        if (!match) {
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'Senha incorreta.'
            }
        }

        const payload = {sub: user.id, username: user.name};
        return {
            access_token: await this.jwtToken.signAsync(payload)
        }
    }catch(error){

    }
    
  }


}
