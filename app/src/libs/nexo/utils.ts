import { ClientApp } from "./clientApp";
import { Message } from "./transporter";

export const message = <TPayload = unknown>(
  type: string,
  payload?: TPayload
): Message => ({
  type,
  payload,
});

export const asyncAction = <TResponse, TRequest = undefined>(
  nexo: ClientApp,
  action: string,
  payload?: TRequest
): Promise<TResponse> => {
  return new Promise((resolve) => {
    const unsuscribe = nexo.suscribe(action, (response: TResponse) => {
      resolve(response);
      unsuscribe();
    });
    nexo.dispatch(message(action, payload));
  });
};
