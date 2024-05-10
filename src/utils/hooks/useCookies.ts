import { addDays } from "date-fns";
import { useCallback, useState } from "react";

// #region | Helper functions & Types

export type CookieOptions = {
  expires?: string;
  path?: string;
};

export type CookieSettings = {
  key: string;
  value?: string;
  initialValue?: string;
  options?: CookieOptions;
};

const IS_BROSWER = typeof window !== "undefined";

const setCookie = ({ key, value, options }: CookieSettings) => {
  if (!IS_BROSWER) return;

  const optionsWithDefaults = {
    path: "/",
    expires: addDays(Date.now(), 7),
    ...options,
  };

  document.cookie = `${key}=${encodeURIComponent(value || "")}; expires=${
    optionsWithDefaults.expires
  }; path=${optionsWithDefaults.path}`;
};

const getCookie = ({ key, initialValue = "" }: CookieSettings) => {
  return (
    (IS_BROSWER &&
      document.cookie.split("; ").reduce((r, v) => {
        const parts = v.split("=");
        return parts[0] === key ? decodeURIComponent(parts[1]) : r;
      }, "")) ||
    initialValue
  );
};

const removeCookie = (key: string) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// #endregion

export const useCookies = ({ key, initialValue }: CookieSettings) => {
  const [item, setItem] = useState<undefined | string>(() => {
    return getCookie({ key, initialValue });
  });

  const removeItem = useCallback(() => {
    setItem(undefined);
    removeCookie(key);
  }, [key]);

  const updateItem = useCallback(
    ({ value, options }: { value: string; options: CookieOptions }) => {
      setItem(value);
      setCookie({ key, value, options });
    },
    [key]
  );

  return { cookie: item, setCookie: updateItem, removeCookie: removeItem };
};
