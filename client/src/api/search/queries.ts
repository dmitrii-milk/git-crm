import useSWR from 'swr';
import { config } from '../../config';
import { TSearchResult } from '../../interfaces/github.ts';

export function useSearch(search: string) {
  return useSWR<TSearchResult>(`${config.API_URL}/github/search-repository?name=${search}`);
}
