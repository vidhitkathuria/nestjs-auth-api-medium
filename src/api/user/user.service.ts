import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { UpdateNameDto } from './user.dto';
import { User } from './user.entity';
@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  //Updates the name of user
  public async updateName(body: UpdateNameDto, req: Request): Promise<User> {
    const user: User = <User>req.user;

    user.name = body.name;

    return this.userRepository.save(user);
  }
}
