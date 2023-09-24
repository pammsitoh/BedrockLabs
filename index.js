const { app, BrowserWindow } = require('electron')
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.maximize()

  win.loadFile(path.join(__dirname, 'build', 'index.html'))
  win.webContents.on('did-finish-load', () => {
    win.show();
  });
}

const createLoadingScreen = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false, // Esto eliminará la barra de título y los bordes
    transparent: true, // Esto hará que la ventana sea transparente
  })

  win.setIgnoreMouseEvents(true)

  win.maximize()

  win.loadFile('public/splash.html')
  win.on('closed', () => (loadingScreen = null));
  win.webContents.on('did-finish-load', () => {
    win.show();
  });
  setTimeout(() => {
    win.close();
    createWindow()
  }, 5000);
}

app.whenReady().then(() => {
  createLoadingScreen()
})