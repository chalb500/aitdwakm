describe("Controller", function() {

  function keyPress(key) {
    var event = document.createEvent('Event');
    event.keyCode = key;
    event.initEvent('keydown');
    document.dispatchEvent(event);
  }

  var fakeClientSocket = {
    ActivePlayerId: 1,
    outid: undefined,
    outx: undefined,
    outy: undefined,
    SendCoordinates: function(id, x, y) {
      this.outid = id;
      this.outx = x;
      this.outy = y;
    }
  }

  it("can move a player left", function() {
    var controller = new Controller(fakeClientSocket);
    document.addEventListener("keydown", controller.keyDown.bind(controller), false);
    keyPress(65);
    expect(fakeClientSocket.outx).toBe(-5);
  });
  it("can move a player right", function() {
    var controller = new Controller(fakeClientSocket);
    document.addEventListener("keydown", controller.keyDown.bind(controller), false);
    keyPress(68);
    expect(fakeClientSocket.outx).toBe(5);
  });
  it("can move a player up", function() {
    var controller = new Controller(fakeClientSocket);
    document.addEventListener("keydown", controller.keyDown.bind(controller), false);
    keyPress(83);
    expect(fakeClientSocket.outy).toBe(5);
  });
  it("can move a player down", function() {
    var controller = new Controller(fakeClientSocket);
    document.addEventListener("keydown", controller.keyDown.bind(controller), false);
    keyPress(87);
    expect(fakeClientSocket.outy).toBe(-5);
  });
});
