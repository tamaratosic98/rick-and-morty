import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, useLocation } from "react-router-dom";
import { AUTH_COOKIE_KEY } from "../../utils/constants";

export const RouteGuard = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const location = useLocation();
  const [cookies] = useCookies([AUTH_COOKIE_KEY]);

  return cookies.auth_token ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/sign-in"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  );
};
