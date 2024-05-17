import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthCookie } from '../../modules/auth/auth.hooks';

export const RouteGuard = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const location = useLocation();
  const { cookie } = useAuthCookie();

  return cookie ? (
    <>{children}</>
  ) : (
    <Navigate replace={true} to="/sign-in" state={{ from: `${location?.pathname}${location?.search}` }} />
  );
};
