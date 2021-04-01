import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  providers: [],
  exports: [],
  imports: [AuthModule, UsersModule],
})
export class SharedModule {}
