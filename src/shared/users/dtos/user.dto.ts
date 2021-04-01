import { Role } from '../../auth/models/role/role.entity';
import {
  IsDefined,
  IsEmail,
  IsEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class UserDto {
  id: number;

  salt: string;

  @IsString({ always: true })
  @IsDefined({ always: true })
  @MaxLength(50)
  username: string;

  @IsEmail()
  @IsDefined({ always: true })
  @MaxLength(100)
  email: string;

  @IsDefined({ always: true })
  @IsString({ always: true })
  password: string;

  @ValidateNested({ each: true, always: true })
  @IsDefined({ always: true, each: true })
  roles: Role[];

  @IsEmpty({ always: true })
  createdAt: Date;

  @IsEmpty({ always: true })
  updatedAt?: Date;

  @IsEmpty({ always: true })
  deletedAt?: Date;
}
