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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async signup(data) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already registered');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                fullName: data.fullName,
                userType: data.userType,
            },
        });
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
    async login(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
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
    async validateUser(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map