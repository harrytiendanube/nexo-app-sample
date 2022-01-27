import { ACTION_CONNECTED } from "./actions";
import { Dispatch, registerIframe, Suscribe } from "./transporter";

type OnReady = (callback: () => void) => void;
export interface ClientApp {
  clientId: string;
  dispatch: Dispatch;
  suscribe: Suscribe;
  onReady: OnReady;
}

export const createClient = ({
  clientId,
  log = false,
}: {
  clientId: string;
  log?: boolean;
}): ClientApp => {
  let isReadyMutable = false;

  const { dispatch, suscribe } = registerIframe(log);
  const onReady: OnReady = (callback) => {
    if (isReadyMutable) {
      throw new Error("onReady should be run only once");
    }

    const readyUnsuscribe = suscribe(ACTION_CONNECTED, () => {
      callback();
      readyUnsuscribe();
      isReadyMutable = true;
    });

    dispatch({ type: ACTION_CONNECTED });
  };

  return {
    clientId,
    dispatch,
    suscribe,
    onReady,
  };
};
