import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        userType: true,
        createdAt: true,
        title: true,
        bio: true,
        skills: true,
        hourlyRate: true,
        rating: true,
        completedJobs: true,
        location: true,
        imageUrl: true,
        languages: true,
        education: true,
        experience: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getPublicProfile(userId: string) {
    // This is for retrieving profiles of other users - same info but no email
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        userType: true,
        createdAt: true,
        title: true,
        bio: true,
        skills: true,
        hourlyRate: true,
        rating: true,
        completedJobs: true,
        location: true,
        imageUrl: true,
        languages: true,
        education: true,
        experience: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getAllFreelancers(search?: string, skills: string[] = []) {
    const freelancers = await this.prisma.user.findMany({
      where: {
        userType: 'freelancer',
        AND: [
          search ? {
            OR: [
              { fullName: { contains: search, mode: 'insensitive' } },
              { title: { contains: search, mode: 'insensitive' } },
            ],
          } : {},
          skills.length > 0 ? {
            skills: {
              hasSome: skills,
            },
          } : {},
        ],
      },
      select: {
        id: true,
        fullName: true,
        userType: true,
        title: true,
        skills: true,
        hourlyRate: true,
        rating: true,
        completedJobs: true,
        location: true,
        imageUrl: true,
        createdAt: true,
      },
      orderBy: {
        rating: 'desc',
      },
    });

    return freelancers;
  }

  async updateProfile(userId: string, profileData: any) {
    // Find the user first to check if it exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update the user profile fields
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        title: profileData.title,
        bio: profileData.bio,
        skills: profileData.skills || [],
        hourlyRate: profileData.hourlyRate,
        location: profileData.location,
        imageUrl: profileData.imageUrl,
        languages: profileData.languages || [],
        education: profileData.education || [],
        experience: profileData.experience || [],
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        userType: true,
        createdAt: true,
        title: true,
        bio: true,
        skills: true,
        hourlyRate: true,
        rating: true,
        completedJobs: true,
        location: true,
        imageUrl: true,
        languages: true,
        education: true,
        experience: true,
      },
    });

    return updatedUser;
  }
} 