import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma-service/prisma-service.service';

@Injectable()
export class HealthService {
  constructor(private readonly prismaService: PrismaService) {}

  async check() {
    try {
      // Test database connection
      await this.prismaService.$queryRaw`SELECT 1`;
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        services: {
          database: 'up',
          api: 'up',
        },
      };
    } catch (error) {
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
        services: {
          database: 'down',
          api: 'up',
          error: error.message,
        },
      };
    }
  }
}
