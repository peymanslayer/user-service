import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { AddUserCommandHandler } from './cqrs/command/handler/addUser.command.handler';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './services/auth.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule,
    PassportModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'peyman1378()&P',
      database: 'user-service',
      entities: [User],
      synchronize: true,
    }),
  
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'ooo',
      signOptions: { expiresIn: '60s' },
    }),

  ],
  controllers: [UserController],
  providers: [UserService,AuthService,AddUserCommandHandler,JwtStrategy],
})
export class UserModule {}
