import { PrismaService } from '../prisma/prisma.service';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    createTask(userId: string, data: {
        title: string;
        description: string;
        budget: number;
        skills: string[];
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        skills: string[];
        description: string;
        budget: number;
        status: string;
        clientId: string;
    }>;
    getAllTasks(filters?: {
        search?: string;
        skills?: string[];
        status?: string;
    }): Promise<({
        client: {
            id: string;
            fullName: string;
            imageUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        skills: string[];
        description: string;
        budget: number;
        status: string;
        clientId: string;
    })[]>;
    getTaskById(id: string): Promise<{
        client: {
            rating: number | null;
            id: string;
            fullName: string;
            location: string | null;
            imageUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        skills: string[];
        description: string;
        budget: number;
        status: string;
        clientId: string;
    }>;
    getClientTasks(clientId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        skills: string[];
        description: string;
        budget: number;
        status: string;
        clientId: string;
    }[]>;
    updateTask(taskId: string, userId: string, data: {
        title?: string;
        description?: string;
        budget?: number;
        skills?: string[];
        status?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        skills: string[];
        description: string;
        budget: number;
        status: string;
        clientId: string;
    }>;
    deleteTask(taskId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        skills: string[];
        description: string;
        budget: number;
        status: string;
        clientId: string;
    }>;
}
