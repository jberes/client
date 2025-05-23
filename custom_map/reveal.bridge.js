var host;
window.revealBridge = {
  sendMessageToHost: function (data) {
    try {
      if (window.parent && window.parent.location) {
        window.parent.postMessage(data, "*");
      }
    } catch (e) {
      // window.parent.postMessage couldn't be executed.
      // This should never happen but...
    }
  },

  notifyExtensionIsReady: function (formatting) {

    if (formatting) {
      this.sendMessageToHost({ message: "ready", formatting: true });
    } else {
      this.sendMessageToHost({ message: "ready" });
    }
  },
}

function processMessageFromHost(message) {
  if (!message || !message.data || !message.data.metadata) {
    return;
  }

  if (message.data.message) {
    return;
  }

  if (!window.revealBridgeListener) {
    return;
  }

  window.revealBridgeListener.dataReady(message.data);
};

window.addEventListener('message', processMessageFromHost, false);