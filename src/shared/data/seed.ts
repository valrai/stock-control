import { AppModule } from './../../app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeederService } from './services/seeder/seeder.service';

async function bootstrap() {
  NestFactory.createApplicationContext(AppModule)
    .then((appContext) => {
      const logger = new Logger('bootstrap');
      const seeder = appContext.get(SeederService);

      seeder
        .seed()
        .then(() => {
          logger.debug('Seeding completed!');
        })
        .catch((error) => {
          logger.error('Seeding failed!');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch((error) => {
      throw error;
    });
}

bootstrap();
