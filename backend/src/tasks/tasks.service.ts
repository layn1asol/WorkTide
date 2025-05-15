import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(
    userId: string,
    data: {
      title: string;
      description: string;
      budget: number;
      skills: string[];
    },
  ) {
    // Verify user is a client
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.userType !== 'client') {
      throw new ForbiddenException('Only clients can create tasks');
    }

    // Create the task
    return this.prisma.task.create({
      data: {
        ...data,
        clientId: userId,
      },
    });
  }

  async getAllTasks(filters?: {
    search?: string;
    skills?: string[];
    status?: string;
  }) {
    const where: Prisma.TaskWhereInput = {};

    // Add status filter if provided, default to 'open' if not provided
    where.status = filters?.status || 'open';

    // Add search filter if provided
    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    // Add skills filter if provided
    if (filters?.skills && filters.skills.length > 0) {
      where.skills = {
        hasSome: filters.skills,
      };
    }

    return this.prisma.task.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        client: {
          select: {
            id: true,
            fullName: true,
            imageUrl: true,
          },
        },
      },
    });
  }

  async getTaskById(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            fullName: true,
            imageUrl: true,
            location: true,
            rating: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async getClientTasks(clientId: string) {
    return this.prisma.task.findMany({
      where: {
        clientId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateTask(
    taskId: string,
    userId: string,
    data: {
      title?: string;
      description?: string;
      budget?: number;
      skills?: string[];
      status?: string;
    },
  ) {
    // Verify task exists and belongs to user
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.clientId !== userId) {
      throw new ForbiddenException('You can only update your own tasks');
    }

    // Update the task
    return this.prisma.task.update({
      where: { id: taskId },
      data,
    });
  }

  async deleteTask(taskId: string, userId: string) {
    // Verify task exists and belongs to user
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.clientId !== userId) {
      throw new ForbiddenException('You can only delete your own tasks');
    }

    // Delete the task
    return this.prisma.task.delete({
      where: { id: taskId },
    });
  }
} 