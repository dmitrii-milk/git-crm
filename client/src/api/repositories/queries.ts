import useSWR from 'swr';
import { config } from '../../config';

export function useRepositories() {
  return useSWR(`${config.API_URL}/repositories`);
}
