import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddUserCommand } from '../impl/addUser.command';
import { User } from 'src/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(AddUserCommand)
export class AddUserCommandHandler implements ICommandHandler<AddUserCommand> {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async execute(command: AddUserCommand): Promise<User> {
    const addUser = await this.userRepo.save(command.user);
    return addUser;
  }
}
