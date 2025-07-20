import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordUseCase {

    constructor(){}

    async validatyPassword(pass: string, hash: string): Promise<any>{
        return await bcrypt.compare(pass, hash);
    }
}