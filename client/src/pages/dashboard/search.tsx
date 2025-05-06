import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import { useCreateRepository } from '../../api/repositories';
import { useSearch } from '../../api/search';
import { useDebounce } from '../../hooks';
import { prepareOptions } from '../../utils';

export const SearchInput = () => {
  const [search, setSearch] = useState('');

  const searchDebounce = useDebounce(search);

  const { data: searchResult, error, isLoading } = useSearch(searchDebounce);
  const { trigger: createOne } = useCreateRepository();

  const onInputChange = (_: React.SyntheticEvent, value: string) => {
    setSearch(value);
  };

  const handleOnChange = (
    _: React.SyntheticEvent,
    option: unknown,
  ) => {
    const { value } = option as {
      value: number;
    };
    const repoData = (searchResult?.items || []).find((item) => item.githubId === value);

    const payload = {
      ...repoData,
    };

    createOne(payload);
  };

  const options = prepareOptions(searchResult?.items || [], { value: 'githubId', label: 'name' });

  return (
    <>
      {error && <div>Error: {error.message}</div>}
      <Autocomplete
        style={{
          marginBottom: 16,
          width: 300,
        }}
        freeSolo
        disableClearable
        options={options}
        value={search}
        onInputChange={onInputChange}
        onChange={handleOnChange}
        loading={isLoading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Repositories"
            slotProps={{
              input: {
                ...params.InputProps,
                type: 'search',
              },
            }}
          />
        )}
      />
    </>
  );
};
