import Paper from '@mui/material/Paper';

import { RepositoriesGrid } from './data-grid.tsx';
import { SearchInput } from './search.tsx';

export const DashboardPage = () => {
  return (
    <Paper sx={{ width: '80%', padding: 2 }}>
      <SearchInput />
      <RepositoriesGrid />
    </Paper>
  );
};
