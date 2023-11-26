# Task Management API

## Overview
This project is a simplified Task Management API built with Node.js and Express. It allows users to manage tasks with basic functionalities like creating, reading, updating, and deleting tasks. Each task includes attributes like a title, description, due date, and status.

## Getting Started

These instructions will guide you on setting up and running the project locally for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- NPM (Node Package Manager)
- Postman or any other API testing tool of your choice

### Installation

Follow these steps to get your development environment running:

1. **Clone the Repository**

2. **Navigate to the Project Directory in Terminal**

3. **Install Dependencies** using `npm install`

5. **Start the Server** using `npm start`

### Using the API

With the server running, you can use tools like Postman to interact with the API.

#### Endpoints

- **Create Task (POST /tasks)**
  *  Creates a new task. 
  * Required fields: `title`, `dueDate`.
 
- **Get All Tasks (GET /tasks)**
  * Retrieves a list of all tasks.

- **Get Task by ID (GET /tasks/:id)**
  * Retrieves a task by its ID.

- **Update Task (PUT /tasks/:id)**
  * Updates an existing task. 
  * Include only the fields that need updating.

- **Delete Task (DELETE /tasks/:id)**
  * Deletes a task by its ID.

## Built With

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)

