import { Button, TextField, Typography } from '@mui/material';
import { Form, generatePath, NavLink, useActionData, useNavigation } from 'react-router-dom';
import { AuthFormWrapper } from '../../components';
import { ROUTES } from '../../constants';

export const LoginPage = () => {
  const navigation = useNavigation();
  const isLoggingIn = navigation.formData?.get('username') != null;

  const actionData = useActionData() as { error: string } | undefined;

  return (
    <AuthFormWrapper>
      <Typography
        fontWeight={600}
        fontSize={'large'}
        variant={'h1'}
        style={{
          paddingBottom: 16,
        }}
      >
        Sign In
      </Typography>

      <Form
        method="post"
        replace
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <TextField required name={'email'} label="Email" type={'email'} size={'small'} variant="outlined" />
        <TextField required name={'password'} label="Password" type={'password'} size={'small'} variant="outlined" />

        <NavLink to={generatePath(ROUTES.REGISTRATION)}>
          <Typography
            style={{
              paddingTop: 16,
            }}
          >
            Create Account
          </Typography>
        </NavLink>

        <Button
          type="submit"
          disabled={isLoggingIn}
          variant={'contained'}
          style={{
            marginTop: 16,
          }}
        >
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </Button>

        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </AuthFormWrapper>
  );
};
