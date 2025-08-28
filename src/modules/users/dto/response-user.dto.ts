import { Expose, Transform } from 'class-transformer';
import { UserDto } from './user.dto';
import { FullName } from '../utils/full-name';

@Expose()
export class ResponseUserDto extends UserDto {
  @Transform(FullName)
  fullName: string;

  @Expose()
  @Transform(({ obj }) => {
    const birth = obj?.birthDate as string;

    if (!birth) return undefined;

    const birthDate = new Date(birth);

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();

    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age -= 1;
    }

    return age;
  })
  age: number;
}
