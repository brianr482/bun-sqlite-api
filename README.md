# CRUD REST API using Bun, Elysia, SQLite and TypeScript
> CRUD REST API using Bun, Elysia, SQLite and TypeScript 🚀. It also includes tests and seeders.

## Installation
1. Run `bun i` to install all the required dependencies

## How to run
Please, follow these steps to ensure the app successfully runs.
1. Copy the `.env.development.example` file into the root of the project and name it `.env.development`. Once you have done this, replace the value for the environment variable `DB_FILE_PATH` with the path to your SQLite database file. Please note that the path is expected to be relative to the root of the project directory.
2. Run the following command `bun run server` to start the API server locally.

There are other commands which could be helpful in the development process:
- Run `bun run server:dev` to run the functions locally and watch for file changes (hot reloading).
- Run `bun run test` to run all the tests with Bun's test runner and get the current code coverage.

### Database
- Run `bun run db:seed` to run the seeders and populate your database with initial data.

## Project Structure
### `src`

#### `controllers`
It has all controllers files that the API needs to handle the communication between the routers and the database. It plays the role of the Elysia.handlers

#### `models`
It contains all the necessary methods to communicate with the data source for each model object identity on this project.

#### `tests`
All the unit tests for this project are located here.

### `db/seeders`
It has the seeders needed to populate the database with the initial mock data for the project.