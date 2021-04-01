import { RoleDto } from './../role/role.dto';
import { IsDefined, IsString, IsEmpty, ValidateNested } from 'class-validator';

export class ClaimDto {
  id: number;

  @IsDefined({ always: true })
  @IsString({ always: true })
  name: string;

  @IsEmpty({ always: true })
  createdAt: Date;

  @IsEmpty({ always: true })
  updatedAt?: Date;

  @ValidateNested({ each: true, always: true })
  roles: RoleDto[];
}
