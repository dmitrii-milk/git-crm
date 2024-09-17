export type TGitHubRepoResponse = {
  githubId: number;
  node_id: string;
  author: string;
  name: string;
  url: string;
  rating: number;
  forks: number;
  issues: number;
  userId: number;
};

export type TSearchResult = {
  incomplete_results: false;
  items: TGitHubRepoResponse[];
  total_count: number;
};
