import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload,EventPattern } from '@nestjs/microservices/decorators';
import { CreateUserDto } from './dtos/create.user.dto';
import { UseFilters } from '@nestjs/common';
import { MongoExceptionFilter } from './filters/mongoose.filter';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @EventPattern('insertUser')
  @UseFilters(MongoExceptionFilter)
  async insertUser(user: CreateUserDto | any) {
    const result=await  this.userService.inserOne(user)    
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
  async findAllUsers(){
    const result=await this.userService.findAll();
    return result;
  }

  @EventPattern('findUser')
  async findUser(@Payload() email){
    const result=await this.userService.findUser(email);
    return result;
  }
}
