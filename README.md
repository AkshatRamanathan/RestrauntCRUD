# Express MVC Application

A Restraunt Application for users and admin for food product based CRUD activities and report generations.

## Stack

- Node/ExpressJS
- Mustache templating
- MongoDB (Atlas) + Mongoose ORM

## How to run

1. ```npm i``` the dependencies
1. Ensure mongodb is setup and running (Docker instance)
1. Create `.env` file with required vars
1. ```npm start``` the application

## Environment Variables

Variables required for the application to run

- MONGO_URI
- MONGO_PORT
- MONGO_USERNAME
- MONGO_PASSWORD
- JWT_SECRET
- MONGO_DATABASE