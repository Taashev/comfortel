import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UserEntity } from './entities/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
