# Teach2Give Express CRUD API

## Description

This is a simple Express.js application that provides a RESTful API for managing users using Xata as the database. The API allows you to create, read, update, and delete user records.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Sample JSON for Creating a User](#sample-json-for-creating-a-user)
- [Image](#image)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ratified/Teach2Give-Express-JS.git
   cd Teach2Give-CRUD
    ```
### Install the dependencies:
```bash
npm install
```

### Create a .env file in the root directory and add your Xata API key and branch:
```bash
XATA_API_KEY=your_xata_api_key
XATA_BRANCH=your_xata_branch
```

### Start the server:
```bash
npm run dev
```
The server will be running on http://localhost:5000.

### Usage
You can use tools like Postman to interact with the API. The following API endpoints are available:

## API Endpoints
| Method  |	Endpoint  |	Description |
| ------  | --------  | ----------- |
|  POST	  |/api/users	  |  Create a new user|
| GET	  | /api/users    |	Get all users
| GET	  | /api/users/:id | Get a single user by ID
| PUT	| /api/users/:id	| Update a user by ID
| DELETE |	/api/users/:id | Delete a user by ID

### Sample JSON for Creating a User
To create a new user, send a POST request to /api/users with the following JSON body:
```json
{
    "username": "exampleUsername",
    "displayName": "Example User"
}
```

## IMAGE
![Screenshot]('http://localhost:5000/images/screenshot.png')

## License
This project is licensed under the MIT License - see the LICENSE file for details.