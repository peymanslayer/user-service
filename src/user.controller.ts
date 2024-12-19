import { Controller, Get } from '@nestjs/common';
import { UserService } from './services/user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddUserDto } from './dtos/adduser.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('register')
  signUp(@Payload() user:AddUserDto): string {
    return this.userService.getHello();
  }
}
