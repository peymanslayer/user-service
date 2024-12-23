import { Injectable } from '@nestjs/common';
import { CommandBus , QueryBus } from '@nestjs/cqrs';
import { AddUserCommand } from 'src/cqrs/command/impl/addUser.command';
import { FindUserQuery } from 'src/cqrs/query/impl/finduser.query.imp';
import { AddUserDto } from 'src/dtos/adduser.dto';
import { FindUserDto } from 'src/dtos/finduser.dto';
import { User } from 'src/user.entity';

@Injectable()
export class UserService {
 constructor(private readonly commandBus:CommandBus , private readonly queryBus:QueryBus){}
 async addUser(user:AddUserDto): Promise<User> {
    const addedUser=await this.commandBus.execute(new AddUserCommand(user));
    return addedUser
  }
 async getUserByMobile(user: FindUserDto) : Promise<User> {
  const getUserByMobile=await this.queryBus.execute(new FindUserQuery(user.mobile));
  return getUserByMobile;
 }
}
