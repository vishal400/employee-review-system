# Employee Review System

This web application provides a platform for managing employee performance reviews efficiently.

## Introduction

The Employee Review System is live and can be accessed [here](https://employee-review-system-1bi7.onrender.com).

## Features

- **User Authentication:** Users can log in and create an account. Sessions are maintained, so users remain logged in even if they close the window and return later.

- **User Roles:** There are two types of employees - admin and employee. 
  - Admins can:
    - View a list of all employees.
    - Update employee information.
    - Assign work by creating reviews for other employees to provide feedback.
  - Employees can:
    - View and submit reviews they've received.

## Files and Folder Structure

The project follows a Node.js MVC (Model-View-Controller) file/folder structure, ensuring a clean and organized codebase.

- **`/models`:** Contains the Mongoose models for User and Review.

- **`/views`:** Contains the EJS templates for rendering pages.

- **`/controllers`:** Contains the route handlers and logic for each route.

- **`/routes`:** Defines the routes for the application.

- **`/public`:** Contains static files like CSS, JavaScript, and images.

- **`/config`:** Holds configuration files and settings.

- **`/middlewares`:** Custom middleware functions used in the application.

- **`/assets`:** Utility functions used across the application.

- **`index.js`:** The main entry point of the application.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/vishal400/employee-review-system.git
   ```

2. Install dependencies:
   ```bash
   npm intall
   ```

3. Start application:
   ```bash
   npm start
   ```

## Admin Account Credentials

To log into the admin account, use the following credentials:

- **Email:** admin@gmail.com
- **Password:** 123

