import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserQuery } from '../impl/finduser.query.imp';
import { User } from 'src/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindUserDto } from 'src/dtos/finduser.dto';


@QueryHandler(FindUserQuery)
export class FindUserQueryHandler implements IQueryHandler<FindUserQuery> {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async execute(query:FindUserDto): Promise<User> {
    const addUser : User = await this.userRepo.findOneBy({mobile:query.mobile});
    return addUser;
  }
}