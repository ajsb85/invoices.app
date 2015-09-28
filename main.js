var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var fs = require('fs');
var ipc = require('ipc');
var onlineStatusWindow;

var locals = {/* ...*/};
var j = require('electron-jade')({pretty: true}, locals);
var Menu = require('menu');





app.commandLine.appendSwitch('v', -1);
app.commandLine.appendSwitch('vmodule', 'console=0');
app.dock.setBadge('1')
// Report crashes to our server.
require('crash-reporter').start();

console.log(app.getLocale());

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
//app.dock.hide()
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  app.addRecentDocument('/Users/ajsb85/Documents/factura.pdf');
  var dockMenu = Menu.buildFromTemplate([
    { label: 'New Window', click: function() { console.log('New Window'); } },
    { label: 'New Window with Settings', submenu: [
      { label: 'Basic' },
      { label: 'Pro'}
    ]},
    { label: 'New Command...'}
  ]);
  app.dock.setMenu(dockMenu);
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.setRepresentedFilename('/etc/passwd');
  mainWindow.setDocumentEdited(true);
  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.jade');
  var webContents = mainWindow.webContents;
  // Open the DevTools.
  mainWindow.openDevTools();
  //mainWindow.print();
//<webview>.printToPDF(options, callback


  // webContents.on("did-finish-load", function() {
  //
  //
  //   // Use default printing options
  //   webContents.printToPDF({}, function(error, data) {
  //     if (error) throw error;
  //     fs.writeFile("/tmp/print.pdf", data, function(error) {
  //       if (error)
  //         throw error;
  //       console.log("Write PDF successfully.");
  //     })
  //   })
  // });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

function getCustomer(event) {
  Customer.orderBy({index: 'email'}).run().then(function(customers) {
      event.sender.send('get-customers', customers);
  }).error(handleError());
}

ipc.on('get-customers', getCustomer);

ipc.on('add-customer', function(event, customer) {
  var customer = new Customer(customer);
  customer.save().then(function(result) {
      event.sender.send('add-customers', result);
      getCustomer(event);
  }).error(handleError());
});


function handleError() {
    return function(error) {
        console.log(error.message);
        return true;
    }
}

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
var Invoice = thinky.createModel("Invoice", {
    id: type.string(),
    title: type.string(),
    content: type.string(),
    idCustomer: type.string()
});

var Customer = thinky.createModel('Customer', {
  id: type.string(),
  email: type.string(),
  address: type.string(),
  rif: type.string(),
  name: type.string()
});

// // Join the models
 Invoice.belongsTo(Customer, "customer", "idCustomer", "id");
 Customer.ensureIndex("email");
//
// //Save a new post with its author.
//
// // Create a new post
// var post = new Post({
//     title: "Hello World!",
//     content: "This is an example."
// });
//
// // Create a new author
// var author = new Author({
//   name: 'Alexander J. Salas B.',
//   rif: 'V-15860685',
//   email: 'a.salas@ieee.org',
//   addres: 'San Blas, Calle 100 Colombia entre Branger y Ricaurte'
// });
//
// // Join the documents
// post.author = author;
//
//
// post.saveAll().then(function(result) {
//   console.log(result);
//     /*
//     post = result = {
//         id: "0e4a6f6f-cc0c-4aa5-951a-fcfc480dd05a",
//         title: "Hello World!",
//         content: "This is an example.",
//         idAuthor: "3851d8b4-5358-43f2-ba23-f4d481358901",
//         author: {
//             id: "3851d8b4-5358-43f2-ba23-f4d481358901",
//             name: "Michel"
//         }
//     }
//     */
// });
