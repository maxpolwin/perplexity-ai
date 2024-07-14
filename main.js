// Open Developer Tools 
//const { is } = require('electron-util');

// Import electron´s app and BrowserWindow functionality
const { app, BrowserWindow } = require("electron");
// Define the browser window and what file the application will load
const path = require("path");

app.allowRendererProcessReuse = true;
// to avoid garbage collection, delcare the window as the variable mainWindow
let mainWindow;


app.on("ready", () => {
  // Create BrowserWindow for the main application when the app is ready
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 758,
    backgroundColor: "#272829",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    }, // Hide window frame (including menu bar)
    autoHideMenuBar: true,
  });


  // Load your initial HTML file
  mainWindow.loadFile(path.join(__dirname, "initial.html"));

    // if in development mode, open the browser dev tools
    //if (is.development) { window.webContents.openDevTools();
    // }

  // Check if the current URL requires a redirect
  mainWindow.webContents.on('did-finish-load', () => {
    const currentURL = mainWindow.webContents.getURL();
    
    // Check if the current URL is the specified one that requires redirection
    if (currentURL === "https://www.perplexity.ai/auth/verify-request") {

        mainWindow.loadFile('./url-open.html');
    }
  });



  // Dialog logic can be included here if needed
  // when the window is closed, reset the mainWindow variable
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

// When all windows are closed, quit the application

app.on("window-all-closed", () => {
  // Except when the app is running on macOS since this contradicts
  // the expected defualt behaviour of an macOS application. On MacOS
  // only quit the app when a user explicitly quits it
  if( process.platform !== 'darwin') {
  app.quit();
  }
});


// Hier ist es noch buggy. warum? Problem mit mainWindow.show()
// ggf. falls nicht wie auf s. 209 mainWindow als Variable definiert
app.on('activate', () => {
  // on macOS, re-create the window when the icon is clicked in the dock 
  if (mainWindow === null) {
       show;
        }
  });