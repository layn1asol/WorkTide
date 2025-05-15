import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { ProfileModule } from './profile/profile.module';
import { RatingsModule } from './ratings/ratings.module';
import { TaskApplicationsModule } from './task-applications/task-applications.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    TasksModule,
    ProfileModule,
    RatingsModule,
    TaskApplicationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
