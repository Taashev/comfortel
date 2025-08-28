import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class GetUserByIdDto extends PickType(UserDto, ['id']) {}
