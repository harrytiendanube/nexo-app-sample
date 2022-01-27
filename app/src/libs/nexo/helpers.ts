import {
  ACTION_AUTH_SESSION_TOKEN,
  ACTION_STORE_INFO,
  ACTION_READY,
  ACTION_NAVIGATE_BACK,
  AuthSessionTokenReponse,
  StoreInfoReponse,
  ACTION_NAVIGATE_GOTO,
  CopyToClipboardReponse,
  ACTION_UTILS_COPY_TO_CLIPBOARD,
  ACTION_NAVIGATE_PATHNAME,
  NavegatePathnameReponse,
  ACTION_NAVIGATE_SYNC,
  ACTION_NAVEGATE_EXIT,
  CopyToClipboardRequest,
} from "./actions";
import { ClientApp } from "./clientApp";
import { asyncAction, message } from "./utils";

export const connect = (nexo: ClientApp, ttl: number = 3000): Promise<void> => {
  return new Promise((resolve, reject) => {
    const timeOut = setTimeout(() => {
      reject(new Error("Timeout"));
    }, ttl);

    nexo.onReady(() => {
      resolve();
      clearTimeout(timeOut);
    });
  });
};

export const iAmReady = (nexo: ClientApp) => {
  nexo.dispatch(message(ACTION_READY));
};

export const navegateExit = (nexo: ClientApp) => {
  nexo.dispatch(message(ACTION_NAVEGATE_EXIT));
};

export const navegateBack = (nexo: ClientApp) => {
  nexo.dispatch(message(ACTION_NAVIGATE_BACK));
};

export const getSessionToken = async (nexo: ClientApp): Promise<string> => {
  const { token } = await asyncAction<AuthSessionTokenReponse>(
    nexo,
    ACTION_AUTH_SESSION_TOKEN
  );
  return token;
};

export const getCurrentPathname = async (
  nexo: ClientApp
): Promise<string | null> => {
  const { pathname } = await asyncAction<NavegatePathnameReponse>(
    nexo,
    ACTION_NAVIGATE_PATHNAME
  );
  return pathname;
};

export const syncPathname = (nexo: ClientApp, pathname: string) => {
  nexo.dispatch(message(ACTION_NAVIGATE_SYNC, { pathname }));
};

export const getStoreInfo = async (
  nexo: ClientApp
): Promise<StoreInfoReponse> => {
  return await asyncAction<StoreInfoReponse>(nexo, ACTION_STORE_INFO);
};

export const goTo = (nexo: ClientApp, pathname: string) => {
  nexo.dispatch(message(ACTION_NAVIGATE_GOTO, { pathname }));
};

export const copyToClipboard = async (
  nexo: ClientApp,
  text: string
): Promise<boolean> => {
  const { success } = await asyncAction<
    CopyToClipboardReponse,
    CopyToClipboardRequest
  >(nexo, ACTION_UTILS_COPY_TO_CLIPBOARD, { text });
  return success;
};