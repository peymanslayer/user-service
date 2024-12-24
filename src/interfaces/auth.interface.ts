import { AddUserDto } from "src/dtos/adduser.dto";
import { FindUserDto } from "src/dtos/finduser.dto";
import { User } from "src/user.entity";
import { IError } from "./error.interface";

export interface IAuth{
    signUp(user: AddUserDto): Promise<User | IError>,
    validateUser (user: FindUserDto, password: string): Promise<User>
}