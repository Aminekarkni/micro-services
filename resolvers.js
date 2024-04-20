
const sqlite3 = require('sqlite3').verbose();

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


const libraryProtoPath = 'library.proto';
const bookProtoPath = 'book.proto';
const userProtoPath = 'user.proto';
const libraryProtoDefinition = protoLoader.loadSync(libraryProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const bookProtoDefinition = protoLoader.loadSync(bookProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const userProtoDefinition = protoLoader.loadSync(userProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const libraryProto = grpc.loadPackageDefinition(libraryProtoDefinition).library;
const bookProto = grpc.loadPackageDefinition(bookProtoDefinition).book;
const userProto = grpc.loadPackageDefinition(userProtoDefinition).user;
const clientLibrarys = new libraryProto.LibraryService('localhost:50051', grpc.credentials.createInsecure());
const clientBooks = new bookProto.BookService('localhost:50052', grpc.credentials.createInsecure());
const userLibrarys = new userProto.UserService('localhost:50053', grpc.credentials.createInsecure());

const db = new sqlite3.Database('./database.db');

// Create a table for librarys
db.run(`
  CREATE TABLE IF NOT EXISTS librarys (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT
  )
`);

// Create a table for books
db.run(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT
  )
`);

// Create a table for users
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT,
    email TEXT
  )
`);


const resolvers = {
  Query: {
    library: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.get('SELECT * FROM librarys WHERE id = ?', [id], (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            resolve(row);
          } else {
            resolve(null);
          }
        });
      });
    },
    librarys: () => {
      return new Promise((resolve, reject) => {
        db.all('SELECT * FROM librarys', (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    },
    book: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            resolve(row);
          } else {
            resolve(null);
          }
        });
      });
    },
    books:() => {
      return new Promise((resolve, reject) => {
        db.all('SELECT * FROM books', (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    },
    user: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            resolve(row);
          } else {
            resolve(null);
          }
        });
      });
    },
    users:() => {
      return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    },

    
  },
  Mutation: {
    CreateLibrary: (_, { id, title, description }) => {
      return new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO librarys (id, title, description) VALUES (?, ?, ?)',
          [id, title, description],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve({ id, title, description });
            }
          }
        );
      });
    },
    CreateBook: (_, { id, title, description }) => {
      return new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO books (id, title, description) VALUES (?, ?, ?)',
          [id, title, description],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve({ id, title, description });
            }
          }
        );
      });
    },
    UpdateLibrary: (_, { id, title, description }) => {
      return new Promise((resolve, reject) => {
        db.run(
          'UPDATE librarys SET title = ?, description = ? WHERE id = ?',
          [title, description, id],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve({ id, title, description });
            }
          }
        );
      });
    
    },
    UpdateBook: (_, { id, title, description }) => {
      return new Promise((resolve, reject) => {
        db.run(
          'UPDATE books SET title = ?, description = ? WHERE id = ?',
          [title, description, id],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve({ id, title, description });
            }
          }
        );
      }
    );
    },
    DeleteLibrary: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.run('DELETE FROM librarys WHERE id = ?', [id], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id });
          }
        });
      
      });
    },
    DeleteBook: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.run('DELETE FROM books WHERE id = ?', [id], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id });
          }
        });
      
      });
    },
    CreateUser: (_, { id, username, password, email }) => {
      return new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO users (id, username, password, email) VALUES (?, ?, ?, ?)',
          [id, username, password, email],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve({ id, username, password, email });
            }
          }
        );
      });
    
    },
    UpdateUser: (_, { id, username, password, email }) => {
      return new Promise((resolve, reject) => {
        db.run(
          'UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?',
          [username, password, email, id],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve({ id, username, password, email });
            }
          }
        );
      }
    );
    },
    DeleteUser: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id });
          }
        });
      
      });
    
    },
  },

  
  

};


module.exports = resolvers;
