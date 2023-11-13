import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { CreateUserEvent } from '../imp/create.user.event';
import { UserRepo } from 'src/user.repository';

@EventsHandler(CreateUserEvent)
export class CreateUserEventHandler implements IEventHandler<CreateUserEvent> {
  constructor(private readonly userRepository: UserRepo) {}
  async handle(event: CreateUserEvent) {
    console.log(event,'this is event');
    
    await this.userRepository.createUser(event.userDto);
  }
}
