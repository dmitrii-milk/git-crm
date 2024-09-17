import useSWRMutation from 'swr/mutation';
import { config } from '../../config';
import { fetchWithCookie } from '../../utils/fetchWithCookie.ts';

async function createRepository(
  url: string,
  {
    arg,
  }: {
    arg: any; // TODO
  }
) {
  await fetchWithCookie(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  });
}

async function updateRepository(
  url: string,
  {
    arg: repositoryId,
  }: {
    arg: number;
  }
) {
  await fetchWithCookie(`${url}/${repositoryId}`, {
    method: 'PATCH',
  });
}

async function deleteRepository(
  url: string,
  {
    arg: repositoryId,
  }: {
    arg: number;
  }
) {
  await fetchWithCookie(`${url}/${repositoryId}`, {
    method: 'DELETE',
  });
}

export function useCreateRepository() {
  return useSWRMutation(`${config.API_URL}/repositories`, createRepository);
}
export function useUpdateRepository() {
  return useSWRMutation(`${config.API_URL}/repositories`, updateRepository);
}
export function useDeleteRepository() {
  return useSWRMutation(`${config.API_URL}/repositories`, deleteRepository);
}
