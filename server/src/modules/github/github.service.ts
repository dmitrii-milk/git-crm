import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubService {
  apiUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.apiUrl = this.configService.get('github.apiUrl');
  }

  async searchRepository(name: string) {
    if (!name) {
      return [];
    }

    const res = await fetch(
      `${this.apiUrl}/search/repositories?q=${name} in:name&sort=stars&order=desc`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data from Github API');
    }

    const data = await res.json();

    return {
      ...data,
      items: data.items.map(this.prepareResponseItem),
    };
  }

  async getData(author: string, name: string) {
    if (!author || !name) {
      throw new Error('Author and name are required');
    }

    const res = await fetch(`${this.apiUrl}/repos/${author}/${name}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data from Github API');
    }

    const data = await res.json();
    return this.prepareResponseItem(data);
  }

  private prepareResponseItem(item: any) {
    return {
      githubId: item.id,
      node_id: item.node_id,
      author: item.owner.login,
      name: item.name,
      url: item.html_url,
      rating: item.stargazers_count,
      forks: item.forks_count,
      issues: item.open_issues_count,
      githubCreatedAt: item.created_at,
    };
  }
}
