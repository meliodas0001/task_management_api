import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from './controllers/users/user.module';
import { AuthModule } from './controllers/auth/auth.module';
import { ContainersModule } from './controllers/containers/containers.module';
import { FoldersModule } from './controllers/folders/folders.module';
import { TasksModule } from './controllers/tasks/tasks.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    ContainersModule,
    FoldersModule,
    TasksModule,
  ],
})
export class HttpModule {}
