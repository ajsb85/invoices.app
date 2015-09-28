
"use strict"
(function(){
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
  var InvoiceModel = function() {
    this.value = [];
    this.symbol = [];
    this.addCard = function(aValue, aSymbol) {
      this.value.push(aValue);
      this.symbol.push(aSymbol);
    };
  }

function getCustomers(event) {
  Customer.orderBy({index: 'email'}).run().then(function(customers) {
      event.sender.send('get-customers', customers);
  }).error(handleError());
}

function addCustomer(event, customer) {
  var customer = new Customer(customer);
  customer.save().then(function(result) {
      event.sender.send('add-customers', result);
      getCustomers(event);
  }).error(handleError());
}

ipc.on('get-customers', getCustomers);
ipc.on('get-customer', getCustomer);
ipc.on('add-customer', addCustomer);
ipc.on('update-customer', updateCustomer);
ipc.on('delete-customer', deleteCustomer);

ipc.on('get-invoices', getInvoices);
ipc.on('get-invoice', getInvoice);
ipc.on('add-invoice', addInvoice);
ipc.on('update-invoice', updateInvoice);
ipc.on('delete-invoice', deleteInvoice);


function handleError() {
    return function(error) {
        console.log(error.message);
        return true;
    }
}
