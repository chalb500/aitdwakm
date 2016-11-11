function Publisher() {
  this.subscribers = [];
}

Publisher.prototype.Subscribe = function(subscriber) {
  this.subscribers.push(subscriber);
}

Publisher.prototype.SendMessage = function(message) {
  for(var i = 0; i < this.subscribers.length; i++) {
    this.subscribers[i].Receive(message);
  }
}
