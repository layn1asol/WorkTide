import { Module } from '@nestjs/common';
import { TaskApplicationsService } from './task-applications.service';
import { TaskApplicationsController } from './task-applications.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TaskApplicationsController],
  providers: [TaskApplicationsService],
  exports: [TaskApplicationsService],
})
export class TaskApplicationsModule {} 