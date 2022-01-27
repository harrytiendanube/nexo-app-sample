export type Dispatch = (event: Message) => void;

type Unsuscribe = () => void;

export type Suscribe = (type: string, callback: any) => Unsuscribe;

export type OnReady = () => void;

export interface Message<T = unknown> {
  type: string;
  payload?: T;
}

export interface MessageToSend extends Message {
  source: {
    host: string;
  };
}

export type Handler = (message: Message) => void;

const dispatchMessage = (message: Message) => {
  if (window.parent === window) {
    return;
  }

  if (!("postMessage" in window.parent)) {
    console.error("can not send a event", message);
  }
  logger("dispatched", message.type, message.payload);
  window.parent.postMessage(message, "*");
};

export const createHandler = (
  type: string,
  callback: (payload: unknown) => void
): Handler => {
  return (message) => {
    if (message.type === type) {
      logger("received", message.type, message.payload);
      callback(message.payload);
    }
  };
};

const logger = (
  from: "dispatched" | "received",
  type: string,
  payload: any
) => {
  if (isLogged) {
    const color: string = from === "dispatched" ? "#f5ec7f" : "#00cc35";

    console.group("%c " + from, "color: " + color);
    console.log("👉 ", type);

    const stringPayload = JSON.stringify(payload);

    stringPayload && console.log("📦  " + stringPayload);
    console.groupEnd();
  }
};

export const suscribeAndUnsuscribeHandlers = (
  handlers: Handler[],
  handler: Handler
) => {
  handlers.push(handler);
  return () => {
    handlers.splice(handlers.indexOf(handler), 1);
  };
};

let isLogged = false;

export const registerIframe = (
  log: boolean = false
): {
  dispatch: Dispatch;
  suscribe: Suscribe;
} => {
  isLogged = log;

  const handlers: Handler[] = [];

  window.addEventListener("message", (event: MessageEvent<Message>) => {
    handlers.forEach((handler) => handler(event.data));
  });

  return {
    dispatch: dispatchMessage,
    suscribe: (type, callback) => {
      const handler = createHandler(type, callback);
      return suscribeAndUnsuscribeHandlers(handlers, handler);
    },
  };
};
