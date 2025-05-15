import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body()
    data: {
      email: string;
      password: string;
      fullName: string;
      userType: 'freelancer' | 'client';
    },
  ) {
    return this.authService.signup(data);
  }

  @Post('login')
  async login(
    @Body() data: { email: string; password: string },
  ) {
    return this.authService.login(data.email, data.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return this.authService.validateUser(req.user.sub);
  }
} 