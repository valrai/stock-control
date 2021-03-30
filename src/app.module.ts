import { TypeOrmService } from './shared/data/services/typeorm/typeorm.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.development.env'],
    }),
    TypeOrmModule.forRoot(TypeOrmService.TypeOrmConfig),
    ProductsModule,
    ConfigModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
