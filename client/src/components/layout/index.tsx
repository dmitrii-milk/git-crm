import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/*<AuthStatus />*/}

      <Outlet />
    </div>
  );
};
