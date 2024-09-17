import { Button, TextField, Typography } from '@mui/material';
import { Form, generatePath, NavLink, useActionData, useNavigation } from 'react-router-dom';
import { AuthFormWrapper } from '../../components';
import { ROUTES } from '../../constants';

export const RegistrationPage = () => {
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
        Sign Up
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
        <TextField required label="Email" name={'email'} type={'email'} size={'small'} variant="outlined" />
        <TextField required label="Password" name={'password'} type={'password'} size={'small'} variant="outlined" />

        <Typography
          style={{
            paddingTop: 16,
          }}
        >
          Already have an account? &nbsp;
          <NavLink to={generatePath(ROUTES.LOGIN)}>Sign In</NavLink>
        </Typography>

        <Button
          type="submit"
          disabled={isLoggingIn}
          variant={'contained'}
          style={{
            marginTop: 16,
          }}
        >
          {isLoggingIn ? 'Registration...' : 'Register'}
        </Button>

        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </AuthFormWrapper>
  );
};
