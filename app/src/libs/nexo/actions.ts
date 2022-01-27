export const ACTION_READY = "app/ready";

export const ACTION_CONNECTED = "app/connected";

export const ACTION_NAVEGATE_EXIT = "app/navigate/exit";

export const ACTION_NAVIGATE_BACK = "app/navigate/back";

export const ACTION_NAVIGATE_GOTO = "app/navigate/goTo";
export type NavegateGoToRequest = {
  pathname: string;
};

export const ACTION_NAVIGATE_PATHNAME = "app/navigate/pathname";
export type NavegatePathnameReponse = {
  pathname: string | null;
};

export const ACTION_NAVIGATE_SYNC = "app/navigate/sync";

export const ACTION_AUTH_SESSION_TOKEN = "app/auth/sessionToken";
export type AuthSessionTokenReponse = {
  token: string;
};

export const ACTION_STORE_INFO = "app/store/info";
export type StoreInfoReponse = {
  id: string;
  name: string;
  url: string;
  country: string;
  language: string;
  currency: string;
};

export const ACTION_UTILS_COPY_TO_CLIPBOARD = "app/utils/copyToClipboard";
export type CopyToClipboardRequest = {
  text: string;
};
export type CopyToClipboardReponse = {
  success: boolean;
};

