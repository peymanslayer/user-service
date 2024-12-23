import { Controller, Get, UseFilters } from '@nestjs/common';
import { UserService } from './services/user.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { AddUserDto } from './dtos/adduser.dto';
import { User } from './user.entity';
import {IError} from "./interfaces/error.interface"
import { AuthService } from './services/auth.service';
import {  MysqlExceptionFilter } from './exception/mysql.filter';


@Controller()
export class UserController {
  constructor(private readonly userService: UserService,private readonly authService:AuthService) {}
  
@UseFilters(new  MysqlExceptionFilter())
  @MessagePattern('register')
  signUp(@Payload() user:AddUserDto): Promise<User | IError> {
    return this.authService.signUp(user);
}
}
