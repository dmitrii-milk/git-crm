import { Injectable } from '@nestjs/common';
import { Prisma, Repository } from '@prisma/client';
import { PrismaService } from '../../services/prisma-service/prisma-service.service';
import { GithubService } from '../github/github.service';
import { CreateRepositoryDto } from './dto/create-repository.dto';

@Injectable()
export class RepositoriesService {
  constructor(
    private prisma: PrismaService,
    private githubService: GithubService,
  ) {}

  create(createRepositoryDto: CreateRepositoryDto): Promise<Repository | null> {
    return this.prisma.repository.create({
      data: createRepositoryDto,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RepositoryWhereUniqueInput;
    where?: Prisma.RepositoryWhereInput;
    orderBy?: Prisma.RepositoryOrderByWithRelationInput;
  }): Promise<Repository[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.repository.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(
    repositoryWhereUniqueInput: Prisma.RepositoryWhereUniqueInput,
  ): Promise<Repository | null> {
    return this.prisma.repository.findUnique({
      where: repositoryWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.RepositoryWhereUniqueInput;
  }): Promise<Repository> {
    const { where } = params;
    const currentRepository = await this.findOne(where);

    const gitHubRepository = await this.githubService.getData(
      currentRepository.author,
      currentRepository.name,
    );

    return this.prisma.repository.update({
      where,
      data: {
        rating: gitHubRepository.rating,
        forks: gitHubRepository.forks,
        issues: gitHubRepository.issues,
      },
    });
  }

  remove(where: Prisma.RepositoryWhereUniqueInput): Promise<Repository> {
    return this.prisma.repository.delete({
      where,
    });
  }
}
