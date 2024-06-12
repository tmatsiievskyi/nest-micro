import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepo } from './users.repo';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepo) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);
    return this.usersRepo.create({
      ...createUserDto,
      password: await bcryptjs.hash(createUserDto.password, 10),
    });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepo.findOne({ email });
    const passwordIsValid = await bcryptjs.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepo.findOne(getUserDto);
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepo.findOne({ email: createUserDto.email });
    } catch (error) {
      return;
    }

    throw new UnprocessableEntityException('Email already exists.');
  }
}
