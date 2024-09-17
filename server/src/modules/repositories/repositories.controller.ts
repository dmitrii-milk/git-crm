import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { RepositoriesService } from './repositories.service';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { UpdateRepositoryDto } from './dto/update-repository.dto';

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() createRepositoryDto: CreateRepositoryDto) {
    const user = req.user;

    return this.repositoriesService.create({
      ...createRepositoryDto,
      userId: user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    const user = req.user;
    return this.repositoriesService.findAll({
      where: {
        userId: user.id,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Request() req, @Param('id') id: string) {
    const user = req.user;
    return this.repositoriesService.update({
      where: {
        id: +id,
        userId: user.id,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    const user = req.user;
    return this.repositoriesService.remove({
      id: +id,
      userId: user.id,
    });
  }
}
