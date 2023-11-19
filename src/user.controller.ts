import { Controller , UseFilters} from '@nestjs/common';
import { UserService } from './user.service';
import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices/decorators';
import { CreateUserDto } from './dtos/create.user.dto';



@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('insertUser')
  async insertUser(@Payload() data: CreateUserDto) {
    const result = await this.userService.inserOne(data);
    return result;
  }

  @MessagePattern('updateUser')
  async updateOne(@Payload() user) {
    const result = await this.userService.updateOne(user.userId, user.user);
    return result;
  }

  @MessagePattern('deleteUser')
  async deleteOne(@Payload() id) {
    const result = await this.userService.deleteOne(id.userId);
    return result;
  }

  @MessagePattern('findAllUsers')
  async findAllUsers() {
    const result = await this.userService.findAll();
    return result;
  }

  @MessagePattern('findUser')
  async findUser( @Payload() email) :Promise<any> {
   return await this.userService.findUser(email) 
  }
}
