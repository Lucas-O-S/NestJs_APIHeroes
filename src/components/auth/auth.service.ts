import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/infrastructure/database/sequelize/models/index.model';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private config: ConfigService,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        @InjectModel(Role)
        private readonly roleModel : typeof Role
    ) {}

    async signIn(email: string, pass: string, res: Response): Promise<any> {
        try{
            const user = await this.userService.findOneUser(email);
            console.log("dados usuario:",user);

            if (!user) {
                throw new Error("Usuário não encontrado.");
            }

            const role = await this.roleModel.findOne({where:{usuario_id:user.dataValues.id}});
            console.log("dados role:",role);
            const match = await this.validatyPassword(pass, user.dataValues.password);

            if (!match) {
                throw new Error("Credenciais inválidas.");
            }

            if(role){

            }

            const accessToken = await this.generateToken(user.dataValues, role.dataValues);

            const refreshToken = await this.generateRefreshToken(user.dataValues);

            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: true, // apenas HTTPS
                sameSite: 'strict',
                path: '/', // ou só na rota de refresh
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
            });

            return {
                access_token: accessToken
            };        
        }catch(error){
            console.error("Erro ao realizar login:", error.message);

            throw new Error(`Credenciais inválidas ou usuário não encontrado: ${error}`)
        }
    
    }

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
                expiresIn: '15m',
            });

            return accessToken; 
        }catch(error){

        }
    }

    async generateRefreshToken(userData: any): Promise<any> {
        try {
            const payload = { sub: userData.userId, username: userData.username };
            
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

    async getAccessToken(req, res): Promise<any> {
        {
            const token = req.cookies['refresh_token'];
            if (!token) {
                throw new UnauthorizedException('Refresh token ausente');
            }
    
            const payload = await this.verifyRefreshToken(token);
            const user = await this.userService.FindOne(payload.sub);
    
            const newAccessToken = await this.generateToken(user, payload.role);
    
            return res.json({ access_token: newAccessToken });
        }        
    }

    async verifyRefreshToken(token: string): Promise<any> {
        try {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_REFRESH_SECRET, 
        });

        return payload;
        } catch (err) {
        throw new UnauthorizedException('Refresh token inválido ou expirado');
        }
    }
    
}
