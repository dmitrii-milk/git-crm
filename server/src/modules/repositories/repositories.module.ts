import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { PrismaService } from '../../services/prisma-service/prisma-service.service';
import { GithubModule } from '../github/github.module';
import { RepositoriesService } from './repositories.service';
import { RepositoriesController } from './repositories.controller';

@Module({
  imports: [AuthModule, GithubModule],
  controllers: [RepositoriesController],
  providers: [RepositoriesService, PrismaService],
})
export class RepositoriesModule {}
