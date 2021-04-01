import {
  IsDefined,
  IsString,
  IsEmpty,
  IsNumberString,
  Length,
} from 'class-validator';

export class SupplierDto {
  @IsString({ always: true })
  @IsNumberString()
  @Length(14, 14)
  cnpj: string;

  @IsString()
  @IsDefined()
  tradeName: string;

  @IsEmpty()
  createdAt: Date;

  @IsEmpty()
  updatedAt?: Date;

  @IsEmpty()
  deletedAt?: Date;
}
