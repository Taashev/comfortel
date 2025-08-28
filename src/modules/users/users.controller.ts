import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';

@Controller('users')
export class UsersController {
  errorContext = '[USER-CONTROLLER-ERROR]: ';

  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();
    const responseUsersDto = plainToInstance(ResponseUserDto, users);
    return responseUsersDto;
  }

  @Get(':id')
  async getUserById(@Param() { id }: GetUserByIdDto) {
    const user = await this.usersService.getUserByIdOrFail(id);
    const responseUserDto = plainToInstance(ResponseUserDto, user);
    return responseUserDto;
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseUserDto> {
    const createdUser = await this.usersService.createUser(createUserDto);
    const responseUserDto = plainToInstance(ResponseUserDto, createdUser);
    return responseUserDto;
  }

  @Patch(':id')
  async updateUserById(
    @Param() { id }: GetUserByIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.updateUserById(
      id,
      updateUserDto,
    );
    const responseUserDto = plainToInstance(ResponseUserDto, updatedUser);
    return responseUserDto;
  }

  /**
   * Установить активность пользователя true/false
   *
   * пример запроса
   * http://localhost:3000/users/:id/activity?activity=true
   */
  @Patch(':id/activity')
  async setActitivy(
    @Param() { id }: GetUserByIdDto,
    @Query('activity') actitity: boolean,
  ) {
    const user = await this.usersService.setActivity(id, actitity);
    const responseUserDto = plainToInstance(ResponseUserDto, user);
    return responseUserDto;
  }
}
