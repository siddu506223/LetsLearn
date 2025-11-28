# SQL Database App

A simple web application combining HTML, CSS, JavaScript frontend with a Node.js backend featuring an in-memory SQL-like database.

## Features

- Clean, modern UI for managing users
- In-memory database with basic SQL operations (INSERT, SELECT, UPDATE, DELETE)
- RESTful API endpoints
- No external database required - everything runs in memory

## Project Structure

```
LetsLearn/
├── public/
│   ├── index.html      # Main HTML page
│   ├── style.css       # Styling
│   └── app.js          # Frontend JavaScript
├── src/
│   ├── server.js       # Express server
│   └── database.js     # In-memory database
├── package.json        # Dependencies
└── package-lock.json   # Lock file
```

## Installation

```bash
cd LetsLearn
npm install
```

## Running the App

```bash
npm start
```

The app will be available at `http://localhost:3000`

## API Endpoints

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `DELETE /api/users/:id` - Delete a user by ID
- `DELETE /api/users/clear-all` - Clear all users

## How It Works

1. **Frontend**: Simple HTML form to add users, with a table displaying all users
2. **Backend**: Express server handling API requests
3. **Database**: In-memory database with methods for basic SQL operations:
   - `insert()` - Add new records
   - `select()` - Retrieve all records
   - `selectWhere()` - Retrieve records with conditions
   - `update()` - Modify existing records
   - `delete()` - Remove a record
   - `deleteAll()` - Clear the table

## Example Usage

- Enter a name and email in the form and click "Add User"
- Users are automatically displayed in the table
- Click "Delete" to remove a user
- Click "Clear All Data" to delete all users at once
