import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
} from 'class-validator';

import { Gender } from '../enums/gender.enum';

export class UserDto {
  @IsUUID('4', { message: 'id должен соответсвовать формату UUID' })
  id: string;

  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @IsString()
  login: string;

  @IsString()
  firstName: string;

  @IsString()
  middleName: string | null;

  @IsString()
  lastName: string;

  @IsEnum(Gender)
  gender: Gender;

  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/, {
    message:
      'Некорректная дата рождения. Проверьте корректность даных и сооветсвие формату YYYY-MM-DD',
  }) // строка в формате YYYY-MM-DD
  birthDate: string;

  @IsPhoneNumber('RU')
  phone: string | null;

  @IsEmail()
  email: string;

  @IsUrl()
  avatar: string | null;

  @IsBoolean()
  isActive: boolean;
}
