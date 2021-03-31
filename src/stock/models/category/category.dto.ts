import { IsDefined, IsString, IsEmpty } from 'class-validator';

export class CategoryDto {
  @IsDefined({ always: true })
  @IsString({ always: true })
  name: string;

  @IsEmpty({ always: true })
  createdAt: Date;

  @IsEmpty({ always: true })
  updatedAt: Date;
}
