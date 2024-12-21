import { AddUserDto } from "src/dtos/adduser.dto";

export class AddUserCommand {
    constructor(public readonly user:AddUserDto) {}
  }
  