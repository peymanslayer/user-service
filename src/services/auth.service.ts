import { BadRequestException, Injectable } from '@nestjs/common';
import {IError} from '../interfaces/error.interface'
import { AddUserDto } from 'src/dtos/adduser.dto';
import { User } from 'src/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { FindUserDto } from 'src/dtos/finduser.dto';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(user: AddUserDto): Promise<User | IError> {
    const existingUser = await this.userService.getUserByMobile(user);
    if (existingUser) {
      return{
        status:400,
        message:'user exist'
      }
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createUser = await this.userService.addUser({
      ...user,
      password: hashedPassword,
    });
    return createUser;
  }

  async validateUser(user: FindUserDto, password: string): Promise<User> {
    const findUser: User = await this.userService.getUserByMobile(user);
    if (!findUser) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, findUser.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return findUser;
  }
}
