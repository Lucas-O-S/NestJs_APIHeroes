import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from '../../components/auth/auth.service';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../components/auth/constants';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from 'src/infrastructure/database/sequelize/models/index.model';
import { UserModule } from './user.module';
import { AuthController } from '../controllers/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule,
    SequelizeModule.forFeature(models),
    forwardRef(() => UserModule)
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
