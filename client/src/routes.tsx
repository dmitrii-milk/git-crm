import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import { Layout } from './components';
import { DashboardPage, LoginPage, RegistrationPage } from './pages';
import { authService, loginAction, loginLoader, protectedLoader, registrationAction } from './service/auth.ts';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader() {
      return { user: authService.email };
    },
    Component: Layout,
    children: [
      {
        path: 'registration',
        action: registrationAction,
        loader: loginLoader,
        Component: RegistrationPage,
      },
      {
        path: 'login',
        action: loginAction,
        loader: loginLoader,
        Component: LoginPage,
      },
      {
        path: 'dashboard',
        loader: protectedLoader,
        Component: DashboardPage,
      },
    ],
  },
  {
    path: '/logout',
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await authService.signout();
      return redirect('/');
    },
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />;
}
