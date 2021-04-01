import { UserDto } from './../../../users/dtos/user.dto';
import { ClaimDto } from './../claim/claim.dto';
import { IsDefined, IsEmpty, IsString, ValidateNested } from 'class-validator';

export class RoleDto {
  id: number;

  @IsDefined({ always: true })
  @IsString({ always: true })
  name: string;

  @IsEmpty({ always: true })
  createdAt: Date;

  @IsEmpty({ always: true })
  updatedAt?: Date;

  @IsEmpty({ always: true })
  users: UserDto[];

  @ValidateNested({ each: true, always: true })
  claims: ClaimDto[];
}
