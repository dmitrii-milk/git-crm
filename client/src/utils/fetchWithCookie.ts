// src/utils/fetchWithCookie.ts
import Cookies from 'js-cookie';
import { AUTH_COOKIE_NAME } from '../constants';

export async function fetchWithCookie(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const token = Cookies.get(AUTH_COOKIE_NAME);

  const headers = new Headers(init?.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Content-Type', 'application/json');
  }

  const modifiedInit: RequestInit = {
    ...init,
    headers,
    credentials: 'same-origin', // Ensure cookies are sent with the request
  };

  return fetch(input, modifiedInit);
}
