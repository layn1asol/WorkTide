import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, ProfileModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
