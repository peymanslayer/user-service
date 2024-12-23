import { Controller, Get } from '@nestjs/common';
import { UserService } from './services/user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddUserDto } from './dtos/adduser.dto';
import { User } from './user.entity';
import { AuthService } from './services/auth.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService,private readonly authService:AuthService) {}

  @MessagePattern('register')
  signUp(@Payload() user:AddUserDto): Promise<User> {
    return this.authService.signUp(user);
  }
}
