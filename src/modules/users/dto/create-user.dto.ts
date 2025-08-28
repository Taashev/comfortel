import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class CreateUserDto extends IntersectionType(
  // исключаем поля из dto
  OmitType(UserDto, [
    'id',
    'createdAt',
    'isActive',
    'phone',
    'avatar',
    'middleName',
  ]),
  // делаем выбранные поля необзятаельными
  PartialType(PickType(UserDto, ['phone', 'avatar', 'middleName'])),
) {}
