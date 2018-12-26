var WebSocket = require('ws');

function Client() {
  // chunks
  this.headers = { //headers for WebSocket connection.
    'Origin': 'http://ourworldofpixels.com'
  };
}

Client.prototype = {
  connect: function() {
    var opt = {
      headers: this.headers
    };
    if (this.agent) opt.agent = this.agent;
    if (this.local_address) opt.localAddress = this.local_address;

    this.ws = new WebSocket("ws://104.237.150.24:1337", null, opt);
    this.ws.binaryType = "arraybuffer";
    this.ws.onopen = this.onConnect.bind(this);
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onclose = this.onDisconnect.bind(this);
    this.ws.onerror = this.onError.bind(this);
  },
  disconnect: function() {
    if (!this.ws) {
      return false;
    }
    this.ws.close;
    return true;
  },
  onConnect: function() {
    var ints = [];
    if (this.world) {
      this.world = this.world.toLowerCase();
    } else {
      this.world = "ru";
    }
    for (var i = 0; i < this.world.length && i < 24; i++) {
      var charCode = this.world.charCodeAt(i);
      if ((charCode < 123 && charCode > 96) || (charCode < 58 && charCode > 47) || charCode == 95 || charCode == 46) {
        ints.push(charCode);
      }
    }
    var array = new ArrayBuffer(ints.length + 2);
    var dv = new DataView(array);
    for (var i = ints.length; i--;) {
      dv.setUint8(i, ints[i]);
    }
    dv.setUint16(ints.length, 4321, true);
    this.ws.send(array);

    console.log("Connected! (" + this.index + ") Joining world: " + this.world);
   //this.index= this
  },
  onMessage: function(e) {
    message = e.data;
    if (typeof message === "string") { 
     // console.log(message)
      this.chat = message
      return message;
    }
    //console.log(message)
       var dv = new DataView(message);
    switch (dv.getUint8(0)) {
      case 0: // Get id
        this.id = dv.getUint32(1, true);
        console.log("bot id:", this.id);
        break;
    }
  },
  onDisconnect: function() {
    console.log("Disconnected " + this.id + " (" + this.index + ") from server");
    this.connect()
  },
  onError: function(e) {
    //this.ws.reset();
    //console.log(e)
  },
  move: function(x, y) {
    var array = new ArrayBuffer(12);
    var dv = new DataView(array);
    dv.setInt32(0, x, true);
    dv.setInt32(4, y, true);
    dv.setUint8(11, 4);
    this.ws.send(array);
  },
  sendMessage: function(message) {
    this.ws.send(message + String.fromCharCode(10));
  },
  updatePixel: function(x, y, color) {
    var array = new ArrayBuffer(11);
    var dv = new DataView(array);
    dv.setInt32(0, x, true);
    dv.setInt32(4, y, true);
    dv.setUint8(8, color[0]);
    dv.setUint8(9, color[1]);
    dv.setUint8(10, color[2]);
    this.ws.send(array);
  }
}

module.exports = Client;
