import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from '../../common/errors/not-found.error';
import { BadRequestError } from '../../common/errors/bad-request.error';

@Injectable()
export class UsersService {
  errorContext = '[USER-SERVICE-ERROR]: ';

  constructor(private usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const userEntity = this.usersRepository.createUserEntity(createUserDto);

    const user = await this.usersRepository.saveUser(userEntity);

    return user;
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.getUserById(id);
    return user;
  }

  async getUserByIdOrFail(id: string) {
    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundError(`Пользователь ${id} не найден`);
    }

    return user;
  }

  async getUsers() {
    const users = await this.usersRepository.getUsers();

    return users;
  }

  async updateUserById(id: string, updateUserDto: UpdateUserDto) {
    const isEmpty = Object.keys(updateUserDto).length === 0;

    if (isEmpty) {
      throw new BadRequestError(this.errorContext + 'Что обновляем?');
    }

    await this.getUserByIdOrFail(id);

    await this.usersRepository.updateUserById(id, updateUserDto);

    const updatedUser = await this.usersRepository.getUserById(id);

    return updatedUser;
  }

  async setActivity(id: string, activity: boolean) {
    await this.getUserByIdOrFail(id);

    await this.usersRepository.updateActivity(id, activity);

    const updatedUser = this.getUserById(id);

    return updatedUser;
  }
}
