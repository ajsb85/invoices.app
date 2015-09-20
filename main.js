var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

var config = {
  rethinkdb: {
      host: 'localhost',
      port: 28015,
      authKey: '',
      db: 'invoices_development'
  }
}

console.log(process.env.NODE_ENV);

var thinky = require('thinky')(config.rethinkdb);
var type = thinky.type;

// Create a model - the table is automatically created
var Post = thinky.createModel("Post", {
    id: type.string(),
    title: type.string(),
    content: type.string(),
    idAuthor: type.string()
});

var Author = thinky.createModel("Author", {
    id: type.string(),
    name: type.string()
});

// Join the models
Post.belongsTo(Author, "author", "idAuthor", "id");

//Save a new post with its author.

// Create a new post
var post = new Post({
    title: "Hello World!",
    content: "This is an example."
});

// Create a new author
var author = new Author({
    name: "Michel"
});

// Join the documents
post.author = author;


post.saveAll().then(function(result) {
  console.log(result);
    /*
    post = result = {
        id: "0e4a6f6f-cc0c-4aa5-951a-fcfc480dd05a",
        title: "Hello World!",
        content: "This is an example.",
        idAuthor: "3851d8b4-5358-43f2-ba23-f4d481358901",
        author: {
            id: "3851d8b4-5358-43f2-ba23-f4d481358901",
            name: "Michel"
        }
    }
    */
});
