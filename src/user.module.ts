import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { AddUserCommandHandler } from './cqrs/command/handler/addUser.command.handler';

@Module({
  imports: [
    CqrsModule,
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
  
    TypeOrmModule.forFeature([User])

  ],
  controllers: [UserController],
  providers: [UserService,AddUserCommandHandler],
})
export class UserModule {}
