import { Module } from '@nestjs/common';
import { TypeOrmService } from './data/services/typeorm/typeorm.service';

@Module({
  providers: [TypeOrmService],
  exports: [],
})
export class SharedModule {}
