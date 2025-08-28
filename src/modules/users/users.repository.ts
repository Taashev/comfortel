import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestError } from '../../common/errors/bad-request.error';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  errorContext = '[USER-REPOSITORY-ERROR]: ';

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  createUserEntity(createUserDto: CreateUserDto) {
    try {
      return this.usersRepository.create(createUserDto);
    } catch (error) {
      throw new BadRequestError(this.errorContext, error);
    }
  }

  async saveUser(userEntity: UserEntity) {
    try {
      return await this.usersRepository.save(userEntity);
    } catch (error) {
      throw new BadRequestError(
        this.errorContext + 'ошибка при сохранении пользователя в БД',
        error,
      );
    }
  }

  async getUserById(id: string) {
    try {
      return await this.usersRepository.findOne({ where: { id } });
    } catch (error) {
      throw new BadRequestError(
        this.errorContext + 'ошибка при получении пользователя по id в БД',
        error,
      );
    }
  }

  async getUsers() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new BadRequestError(
        this.errorContext + 'ошибка при получении пользователей в БД',
        error,
      );
    }
  }

  async updateUserById(
    id: string,
    updateUserDto: UpdateUserDto | { isActive: boolean },
  ) {
    try {
      return await this.usersRepository.update(id, updateUserDto);
    } catch (error) {
      throw new BadRequestError(
        this.errorContext + 'ошибка при обновлении пользователя в БД',
        error,
      );
    }
  }

  async updateActivity(id: string, activity: boolean) {
    try {
      return await this.usersRepository.update(id, { isActive: activity });
    } catch (error) {
      throw new BadRequestError(
        this.errorContext + 'ошибка при обновлении статуса пользователя в БД',
        error,
      );
    }
  }
}
