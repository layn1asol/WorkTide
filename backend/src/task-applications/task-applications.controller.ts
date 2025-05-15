import { Controller, Post, Get, Param, Body, UseGuards, Request, Put, ForbiddenException } from '@nestjs/common';
import { TaskApplicationsService } from './task-applications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('task-applications')
export class TaskApplicationsController {
  constructor(private readonly taskApplicationsService: TaskApplicationsService) {}

  @Post(':taskId/apply')
  @UseGuards(JwtAuthGuard)
  async applyToTask(
    @Request() req,
    @Param('taskId') taskId: string,
    @Body() data: { coverLetter?: string }
  ) {
    return this.taskApplicationsService.applyToTask(
      req.user.sub, 
      taskId, 
      data.coverLetter
    );
  }

  @Get('task/:taskId')
  @UseGuards(JwtAuthGuard)
  async getTaskApplications(
    @Request() req,
    @Param('taskId') taskId: string
  ) {
    return this.taskApplicationsService.getTaskApplications(taskId, req.user.sub);
  }

  @Get('freelancer')
  @UseGuards(JwtAuthGuard)
  async getFreelancerApplications(@Request() req) {
    return this.taskApplicationsService.getFreelancerApplications(req.user.sub);
  }

  @Put(':applicationId/status')
  @UseGuards(JwtAuthGuard)
  async updateApplicationStatus(
    @Request() req,
    @Param('applicationId') applicationId: string,
    @Body() data: { status: 'accepted' | 'rejected' }
  ) {
    if (!data.status || !['accepted', 'rejected'].includes(data.status)) {
      throw new ForbiddenException('Invalid status');
    }
    
    return this.taskApplicationsService.updateApplicationStatus(
      applicationId,
      req.user.sub,
      data.status as 'accepted' | 'rejected'
    );
  }

  @Put(':applicationId/assign')
  @UseGuards(JwtAuthGuard)
  async assignFreelancer(
    @Request() req,
    @Param('applicationId') applicationId: string
  ) {
    return this.taskApplicationsService.assignFreelancerToTask(
      applicationId,
      req.user.sub
    );
  }
} 