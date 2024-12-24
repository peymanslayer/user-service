import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IError } from '../interfaces/error.interface';
import { AddUserDto } from 'src/dtos/adduser.dto';
import { User } from 'src/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { FindUserDto } from 'src/dtos/finduser.dto';
import { IAuth } from 'src/interfaces/auth.interface';
import { LoginDto } from 'src/dtos/login.dto';
@Injectable()
export class AuthService implements IAuth {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: AddUserDto): Promise<User | IError> {
    const existingUser = await this.userService.getUserByMobile(user);
    if (existingUser) {
      return {
        status: 400,
        message: 'user exist',
      };
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

  async login(user: LoginDto): Promise<User | IError> {
    const payload = { mobile: user.mobile, password: user.password };
    const findUser = await this.userService.getUserByMobile(user);
    if (!findUser) {
      return {
        status: 404,
        message: 'user not exist',
      };
    } else {
      const loginResult =await this.loginProcess(payload, findUser);
      return loginResult
    }
  }

  async loginProcess(payload: LoginDto, foundUser: User): Promise<User | IError> {
    const comparePasswrd = await bcrypt.compare(
      payload.password,
      foundUser.password,
    );
    if (comparePasswrd) {
      const JwtToken = this.jwtService.sign(payload);
      foundUser.tokrn=JwtToken;
      return foundUser;
    } else {
      return {
        status:400,
        message:'password not matches'
      };
    }
  }
}
