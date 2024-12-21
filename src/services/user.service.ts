import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddUserCommand } from 'src/cqrs/command/impl/addUser.command';
import { AddUserDto } from 'src/dtos/adduser.dto';
import { User } from 'src/user.entity';

@Injectable()
export class UserService {
 constructor(private readonly commandBus:CommandBus){}
 async addUser(user:AddUserDto): Promise<User> {
    const addedUser=await this.commandBus.execute(new AddUserCommand(user));
    return addedUser
  }
}
