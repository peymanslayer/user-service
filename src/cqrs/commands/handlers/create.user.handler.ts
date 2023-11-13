/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommandHandler,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { CreateUserCommand } from '../imp/create.user.command';
import { UserRepo } from 'src/user.repository';


@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private repository:UserRepo,
    private publisher:EventPublisher
  ) {}

  async execute(command: CreateUserCommand) {
    console.log(command,"this is command");
    
    console.log(command);
    
    const { userDto } = command;
    const user = this.publisher.mergeObjectContext(
      await this.repository.createUser(userDto),
    );
    
    user.createdUser();
    return user

  }
}
