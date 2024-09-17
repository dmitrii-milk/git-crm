import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useDeleteRepository, useRepositories, useUpdateRepository } from '../../api/repositories';

const prepareColumns = ({
  updateOne,
  deleteOne,
}: {
  updateOne: (id: number) => void;
  deleteOne: (id: number) => void;
}): GridColDef[] => [
  { field: 'author', headerName: 'Author', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'url', headerName: 'Url', width: 130 },
  {
    field: 'rating',
    headerName: 'Stars',
    type: 'number',
    width: 90,
  },
  {
    field: 'forks',
    headerName: 'Forks',

    width: 160,
  },
  {
    field: 'issues',
    headerName: 'Issues',

    width: 160,
  },
  {
    field: 'githubCreatedAt',
    headerName: 'Created At',

    width: 160,
    valueGetter: (value: string) => {
      return new Date(value).getTime();
    },
  },
  {
    field: 'id',
    headerName: 'Actions',

    width: 200,
    renderCell: ({ value }: GridRenderCellParams<any, number>) => {
      return (
        <div>
          <button onClick={() => updateOne(value!)}>Update</button>
          &nbsp;
          <button onClick={() => deleteOne(value!)}>Delete</button>
        </div>
      );
    },
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export const RepositoriesGrid = () => {
  const { data, error, isLoading } = useRepositories();
  const { trigger: updateOne } = useUpdateRepository();
  const { trigger: deleteOne } = useDeleteRepository();

  const columns = prepareColumns({
    updateOne,
    deleteOne,
  });

  return (
    <>
      {error && <div>Error: {error.message}</div>}
      <DataGrid
        loading={isLoading}
        rows={data}
        columns={columns}
        localeText={{
          noRowsLabel: 'There is no data in this list',
        }}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
      />
    </>
  );
};
