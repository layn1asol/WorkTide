import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(data: {
        email: string;
        password: string;
        fullName: string;
        userType: 'freelancer' | 'client';
    }): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            userType: string;
            createdAt: Date;
        };
    }>;
    login(data: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            userType: string;
            createdAt: Date;
            title: string | null;
            bio: string | null;
            skills: string[];
            hourlyRate: number | null;
            rating: number | null;
            completedJobs: number | null;
            location: string | null;
            imageUrl: string | null;
            languages: string[];
            education: import("@prisma/client/runtime/library").JsonValue[];
            experience: import("@prisma/client/runtime/library").JsonValue[];
        };
    }>;
    getProfile(req: any): Promise<{
        id: string;
        email: string;
        fullName: string;
        userType: string;
        createdAt: Date;
        title: string | null;
        bio: string | null;
        skills: string[];
        hourlyRate: number | null;
        rating: number | null;
        completedJobs: number | null;
        location: string | null;
        imageUrl: string | null;
        languages: string[];
        education: import("@prisma/client/runtime/library").JsonValue[];
        experience: import("@prisma/client/runtime/library").JsonValue[];
    }>;
}
