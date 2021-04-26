console.log("ogheyy");

const {
  app,
  BrowserWindow,
  BrowserView,
  Notification,
  ipcMain,
} = require("electron");
const url = require("url");
const server = require("./index");
const util = require("util");
const path = require("path");
const electron = require("electron");

const { Electrolizer } = require("@ugenu.io/electrolizer");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      webviewTag: true,
    },
  });

  win.on("closed", () => {
    win = null;
  });

  win.loadURL("http://localhost:3000");
}
app.on("ready", createWindow);

app.userAgentFallback =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36";
  app.userAgentFallback = "Mozilla/5.0 (Linux; Android 10; SM-G975U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.93 Mobile Safari/537.36";
app.on("web-contents-created", (e, contents) => {
  if (contents.getType() == "webview") {
    ({ window: contents });
  }
});
