import { Controller, Get, Put, Body, UseGuards, Request, Param, Query } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyProfile(@Request() req) {
    return this.profileService.getProfile(req.user.sub);
  }

  @Get('freelancers')
  async getAllFreelancers(@Query('search') search?: string, @Query('skills') skills?: string) {
    const skillsArray = skills ? skills.split(',') : [];
    return this.profileService.getAllFreelancers(search, skillsArray);
  }

  @Get(':id')
  async getPublicProfile(@Param('id') id: string) {
    return this.profileService.getPublicProfile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateProfile(@Request() req, @Body() profileData: any) {
    return this.profileService.updateProfile(req.user.sub, profileData);
  }
} 