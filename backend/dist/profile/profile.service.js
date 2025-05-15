"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProfileService = class ProfileService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(userId) {
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
                isHidden: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async getPublicProfile(userId) {
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
                isHidden: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async getAllFreelancers(search, skills = []) {
        const freelancers = await this.prisma.user.findMany({
            where: {
                userType: 'freelancer',
                isHidden: false,
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
    async updateProfile(userId, profileData) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isHiddenUpdate = user.userType === 'freelancer' && profileData.isHidden !== undefined
            ? { isHidden: profileData.isHidden }
            : {};
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                title: profileData.title,
                bio: profileData.bio,
                skills: profileData.skills || [],
                hourlyRate: profileData.hourlyRate,
                location: profileData.location,
                languages: profileData.languages || [],
                education: profileData.education || [],
                experience: profileData.experience || [],
                ...isHiddenUpdate,
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
                isHidden: true,
            },
        });
        console.log('Profile updated:', {
            userId,
            isHidden: updatedUser.isHidden,
            userType: updatedUser.userType
        });
        return updatedUser;
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map