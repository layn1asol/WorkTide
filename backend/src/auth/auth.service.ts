import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(data: {
    email: string;
    password: string;
    fullName: string;
    userType: 'freelancer' | 'client';
  }) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fullName: data.fullName,
        userType: data.userType,
      },
    });

    // Generate JWT token
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      userType: user.userType,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
        createdAt: user.createdAt,
      },
    };
  }

  async login(email: string, password: string) {
    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      userType: user.userType,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
        createdAt: user.createdAt,
        title: user.title,
        bio: user.bio,
        skills: user.skills,
        hourlyRate: user.hourlyRate,
        rating: user.rating,
        completedJobs: user.completedJobs,
        location: user.location,
        imageUrl: user.imageUrl,
        languages: user.languages,
        education: user.education,
        experience: user.experience,
      },
    };
  }

  async validateUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      userType: user.userType,
      createdAt: user.createdAt,
      title: user.title,
      bio: user.bio,
      skills: user.skills,
      hourlyRate: user.hourlyRate,
      rating: user.rating,
      completedJobs: user.completedJobs,
      location: user.location,
      imageUrl: user.imageUrl,
      languages: user.languages,
      education: user.education,
      experience: user.experience,
    };
  }
} 