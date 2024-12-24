import { Controller, Get, UseFilters } from '@nestjs/common';
import { UserService } from './services/user.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { AddUserDto } from './dtos/adduser.dto';
import { User } from './user.entity';
import { IError } from './interfaces/error.interface';
import { AuthService } from './services/auth.service';
import { MysqlExceptionFilter } from './exception/mysql.filter';
import { LoginDto } from './dtos/login.dto';
import {UseCircuitBreaker} from './user.circuit';
import { breakerOptions } from './user.circuit';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseFilters(new MysqlExceptionFilter())
  @MessagePattern('register')
  async signUp(@Payload() user: AddUserDto): Promise<User | IError> {
    return await this.authService.signUp(user);
  }
  @MessagePattern('login')
  @UseFilters(new MysqlExceptionFilter())
  @UseCircuitBreaker(breakerOptions)
  async logIn(@Payload() user: LoginDto): Promise<User | IError> {
    return await this.authService.login(user);
  }
}
