import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmService {
  public static get TypeOrmConfig(): TypeOrmModuleOptions {
    const configService = {
      get: (varName) => process.env[varName],
    };

    return {
      type: 'postgres',

      host: configService.get('POSTGRES_HOST'),
      port: parseInt(configService.get('POSTGRES_PORT')),
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      database: configService.get('POSTGRES_DB'),

      entities: ['**/*.entity{.ts,.js}'],

      migrationsTableName: 'MIGRATIONS',

      migrations: ['src/shared/data/migrations/*.ts'],

      cli: {
        migrationsDir: 'src/shared/data/migrations',
      },
    };
  }
}
