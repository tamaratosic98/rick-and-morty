import { useCookies } from "../../utils/hooks/useCookies";
import { AUTH_COOKIE_KEY } from "./auth.constants";

export const useAuthCookie = () => useCookies({ key: AUTH_COOKIE_KEY });
