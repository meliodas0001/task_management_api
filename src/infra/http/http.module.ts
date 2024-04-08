import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ContainersModule } from './containers/containers.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, ContainersModule],
})
export class HttpModule {}
