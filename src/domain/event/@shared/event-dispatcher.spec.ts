import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain tvent tests", () => {
  it("should register an envet handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toHaveLength(1);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toHaveLength(1);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toHaveLength(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toHaveLength(1);

    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers).toEqual({});
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toHaveLength(1);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      decription: "Product 1 description",
      price: 10,
    });

    eventDispatcher.notify(productCreatedEvent);

    // quando o notigy for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler).toHaveBeenCalledTimes(1);
    expect(spyEventHandler).toHaveBeenCalledWith(productCreatedEvent);
  });
});
