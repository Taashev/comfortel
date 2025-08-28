import { TransformFnParams } from 'class-transformer';
import { UserEntity } from '../entities/user.entity';

export function FullName({ obj }: TransformFnParams) {
  const { firstName, lastName, middleName } = obj as UserEntity;

  let fullName: string = firstName;

  if (middleName) {
    fullName += ` ${middleName}`;
  }

  fullName += ` ${lastName}`;

  return fullName;
}
