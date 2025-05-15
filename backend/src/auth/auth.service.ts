import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async register(userData: any) {
    const { email, password, fullName, userType } = userData;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Create hash for password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        userType,
        // Don't set imageUrl - we'll use initials based avatar on the frontend
      },
    });

    // Generate JWT token
    const token = this.jwtService.sign({ 
      sub: newUser.id,
      email: newUser.email,
      userType: newUser.userType
    });

    const { password: _, ...user } = newUser;
    return { user, token };
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, userType: user.userType };
    return {
      token: this.jwtService.sign(payload),
      user
    };
  }
} 