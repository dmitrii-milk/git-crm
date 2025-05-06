import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './modules/users/users.module';
import { RepositoriesModule } from './modules/repositories/repositories.module';
import { GithubModule } from './modules/github/github.module';
import { HealthModule } from './modules/health/health.module';
import configuration from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UsersModule,
    RepositoriesModule,
    GithubModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
