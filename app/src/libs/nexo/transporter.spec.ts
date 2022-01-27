import {
  Handler,
  Message,
  suscribeAndUnsuscribeHandlers,
  createHandler,
  registerIframe,
} from "./transporter";

window.parentIFrame = {
  sendMessage: jest.fn(),
};

const { sendMessage: sendMessageMock } = window.parentIFrame;

const simulateReceivingMessage = (message: Message) => {
  window.iFrameResizer.onMessage(message);
};

const simulateReceivingReady = () => {
  window.iFrameResizer.onReady();
};

describe("Transporter", () => {
  it("Create and excecuted Handler", () => {
    let handlerExcecuted = false;

    const handle = createHandler("test", () => {
      handlerExcecuted = true;
    });

    handle({ type: "test" });

    expect(handlerExcecuted).toBeTruthy();
  });

  it("Handlers are added and removed", () => {
    const handlers: Handler[] = [];

    const handler = () => {};

    const removeHandler = suscribeAndUnsuscribeHandlers(handlers, handler);

    expect(handlers.length).toBe(1);

    removeHandler();

    expect(handlers.length).toBe(0);
  });
  it("Register Iframe check onready, suscribe and dispatch", () => {
    let messageReceived = false;
    let isOnReady = false;

    const iframe = registerIframe(() => {
      isOnReady = true;
    });

    simulateReceivingReady();

    expect(isOnReady).toBeTruthy();

    iframe.suscribe("test", () => {
      messageReceived = true;
    });

    simulateReceivingMessage({
      type: "test",
    });

    expect(messageReceived).toBeTruthy();

    const message = {
      type: "test",
    };

    iframe.dispatch(message);

    expect(sendMessageMock).toHaveBeenCalledWith(message);
  });
});
