import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig } from 'swr';
import App from './routes.tsx';
import './styles/index.css';
import { fetchWithCookie } from './utils/fetchWithCookie.ts';

createRoot(document.getElementById('root')!).render(
  <SWRConfig
    value={{
      refreshInterval: 1_000_000,
      fetcher: (resource: RequestInfo | URL, init: RequestInit) =>
        fetchWithCookie(resource, init).then((res) => res.json()),
    }}
  >
    <StrictMode>
      <App />
    </StrictMode>
  </SWRConfig>
);
