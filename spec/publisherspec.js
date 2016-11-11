describe("Publisher", function() {
  it ("Can accept new subscribers", function() {
    var publisher = new Publisher();
    var testSubscriber = "test";
    publisher.Subscribe(testSubscriber);
    var subscriber = publisher.subscribers[0];
    expect(testSubscriber).toEqual(subscriber);
  });

  it ("Can send a message to subscribers", function() {
    var publisher = new Publisher();
    var subscriber = {
      result: undefined,
      Receive: function(message) {
        this.result = message;
      }
    }
    publisher.Subscribe(subscriber);
    publisher.SendMessage("Hi");

    expect("Hi").toEqual(subscriber.result);
  });
});
