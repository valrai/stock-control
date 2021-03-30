import { Module } from '@nestjs/common';
import { TypeOrmService } from './services/typeorm/typeorm.service';

@Module({
  providers: [TypeOrmService],
  imports: [],
})
export class DataModule {}
