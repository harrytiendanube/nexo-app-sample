import { createClient } from "./clientApp";
import { Handler, Message, suscribeAndUnsuscribeHandlers } from "./transporter";

window.parentIFrame = {
  sendMessage: jest.fn(),
};

const { sendMessage: sendMessageMock } = window.parentIFrame;

const simulateReceivingMessage = (message: Message) => {
  window.iFrameResizer.onMessage(message);
};

describe("Client App", () => {
  it("It's ready", () => {
    let isReady = false;

    const { onReady } = createClient({ clientId: "123" });

    onReady(() => {
      isReady = true;
    });

    simulateReceivingMessage({ type: "app/ready" });

    expect(isReady).toBe(true);
  });

  it("Avoid double onReady", () => {
    let isReady = false;

    const { onReady } = createClient({ clientId: "123" });

    onReady(() => {});

    simulateReceivingMessage({ type: "app/ready" });

    const errorReady = () =>
      onReady(() => {
        isReady = true;
      });

    expect(errorReady).toThrowError("onReady should be run only once");
  });

  it("The message is received", () => {
    const { suscribe } = createClient({ clientId: "123" });

    let messageReceived = "";

    const unsubscribe = suscribe("EXAMPLE_ACTION", (payload: string) => {
      messageReceived = payload;
      unsubscribe();
    });

    simulateReceivingMessage({
      type: "EXAMPLE_ACTION",
      payload: "test",
    });

    expect(messageReceived).toBe("test");
  });

  it("The message has been sent", () => {
    const { dispatch } = createClient({ clientId: "123" });

    const message = { type: "EXAMPLE_ACTION" };
    dispatch(message);
    expect(sendMessageMock).toBeCalledWith(message);
  });
});
