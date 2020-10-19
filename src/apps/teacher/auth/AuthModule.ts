import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HttpTeacherProvider } from '../../../modules/teacher/infraestructure/HttpTeacherProvider';
import { JwtStrategy } from '../../shared/auth/JwtStrategy';
import { AuthService } from './auth/AuthService';
import { LocalStrategy } from './auth/LocalStrategy';
import { ProfileGetController } from './get/ProfileGetController';
import { LoginPostController } from './post/LoginPostController';
import { LogoutPostController } from './post/LogoutPostController';

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [
    LoginPostController,
    ProfileGetController,
    LogoutPostController,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, HttpTeacherProvider],
  exports: [AuthService],
})
export class AuthModule {}
