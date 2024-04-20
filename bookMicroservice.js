const sqlite3 = require('sqlite3').verbose();

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


const bookProtoPath = 'book.proto';
const bookProtoDefinition = protoLoader.loadSync(bookProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const bookProto = grpc.loadPackageDefinition(bookProtoDefinition).book;

const bookService = {
  getBook: (call, callback) => {
    
    const notif = {
      id: call.request.book_id,
      title: 'book ex',
      description: 'This is an example book.',
     
    };
    callback(null, {notif});
  },

}
const server = new grpc.Server();
server.addService(bookProto.BookService.service, bookService);
const port = 50052;
let db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
  console.error(err.message);
  throw err;
  }
  console.log('Base de données connectée.');
 });

// Create a table for books
db.run(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT
  )
`);

// Insert a sample book into the table
// db.run(`
//   INSERT INTO books (id, title, description)
//   VALUES (1, 'book ex', 'This is an example book.')
// `);

server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Failed to bind server:', err);
      return;
    }
  
    console.log(`Server is running on port ${port}`);
    server.start();
  });
console.log(`Book microservice running on port ${port}`);
