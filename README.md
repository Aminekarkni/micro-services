# Library Book Microservice
Library Book Microservice is a microservices-based application built with Node.js, gRPC, GraphQL, and REST, 
using SQLite as the database. It consists of three entities: User, Library, and Book. 
This README file provides an overview of the project and other relevant information.

## Table of Contents
Features
Technologies
Getting Started
Prerequisites
Usage
API Endpoints
Database
Contributing

## Features
Microservices architecture with gRPC, GraphQL, and REST
CRUD operations for User, Library, and Book entities
Communication between services using gRPC and RESTful APIs
GraphQL endpoint for flexible querying and data manipulation

## Technologies
Node.js
gRPC
GraphQL
RESTful APIs
SQLite

# Getting Started

## Prerequisites :
Node.js (version 16.14.0)
npm (version 8.5.2)
SQLite (version 5.1.6)
graphql (version 16.6.0)

## Installation :
download all files
Install the dependencies

## Usage : 
Start the microservices:
Start all microservices and the gateway in this order :
node libraryMicroservice.js
node bookMicroservice.js
node userMicroservice.js
node apiGateway.js
The microservices should now be running, and you can access them using the provided endpoints.

## API Endpoints :
GET /library: Retrieves all librarys from the database.
GET /librarys/:id: Retrieves a specific library by its ID.
GET /books/:id: Retrieves a specific book by its ID.
GET /books: Retrieves all books from the database.
POST /library: Creates a new library in the database.
POST /books: Creates a new book in the database.
PUT /library/:id: Updates a specific library by its ID.
PUT /book/:id: Updates a specific book by its ID.
DELETE /library/:id: Deletes a specific library by its ID.
DELETE /book/:id: Deletes a specific book by its ID.
GET /librarys: Retrieves all librarys from the database.
GET /users: Retrieves all users from the database.
GET /users/:id: Retrieves a specific user by its ID.
POST /user: Creates a new user in the database.
DELETE /user/:id: Deletes a specific user by its ID.

## Database :
The project uses SQLite as the database system. The SQLite database file can be found in the database directory.you can delete the database file and it will be recreated when starting the project.

## Contributing :
Contributions are welcome! If you find any issues or have suggestions for improvement, please submit an issue or a pull request. For major changes, please open an issue first to discuss potential changes.
