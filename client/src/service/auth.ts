import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { config } from '../config';
import { AUTH_COOKIE_NAME, ROUTES } from '../constants';
import Cookies from 'js-cookie';

interface AuthService {
  token: string | null;
  isAuthenticated: boolean;
  email: null | string;
  signin(email: string, password: string): Promise<void>;
  signup(email: string, password: string): Promise<void>;
  signout(): Promise<void>;
}

export const authService: AuthService = {
  token: Cookies.get(AUTH_COOKIE_NAME) || null,
  isAuthenticated: !!Cookies.get(AUTH_COOKIE_NAME) || false,
  email: null,

  async signin(email: string, password: string) {
    const res = await fetch(`${config.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error('Failed to signup');
    }

    const data = await res.json();
    const accessToken = data.accessToken;

    Cookies.set(AUTH_COOKIE_NAME, accessToken);

    authService.isAuthenticated = true;
    authService.email = email;
    authService.token = accessToken;
  },

  async signup(email: string, password: string) {
    const res = await fetch(`${config.API_URL}/auth/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error('Failed to signup');
    }

    const data = await res.json();
    const accessToken = data.accessToken;

    Cookies.set(AUTH_COOKIE_NAME, accessToken);

    authService.isAuthenticated = true;
    authService.email = email;
    authService.token = accessToken;
  },

  async signout() {
    Cookies.remove(AUTH_COOKIE_NAME);

    authService.isAuthenticated = false;
    authService.email = null;
    authService.token = null;
  },
};

export async function registrationAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  if (!email || !password) {
    return {
      error: 'You must provide a email and password to register',
    };
  }

  try {
    await authService.signup(email, password);
  } catch (error) {
    if (error instanceof Error) {
      const errorMessages = error.message || 'Failed to signup';
      return {
        error: errorMessages,
      };
    }

    return {
      error: 'Failed to signup',
    };
  }

  return redirect(ROUTES.DASHBOARD);
}

export async function loginAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!email || !password) {
    return {
      error: 'You must provide a email and password to login',
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await authService.signin(email, password);
  } catch (error) {
    if (error instanceof Error) {
      const errorMessages = error.message || 'Failed to signin';
      return {
        error: errorMessages,
      };
    }

    return {
      error: 'Failed to signin',
    };
  }

  return redirect(ROUTES.DASHBOARD);
}

export async function loginLoader() {
  if (authService.isAuthenticated) {
    return redirect('/');
  }
  return null;
}

export function protectedLoader({ request }: LoaderFunctionArgs) {
  if (!authService.isAuthenticated) {
    const params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect(ROUTES.LOGIN + '?' + params.toString());
  }

  return null;
}
