# Level-1-Authentication-Website

A simple registration and login system with authentication.

## Description

This project is a basic registration and login system that allows users to register with an email and password and log in using their credentials. It demonstrates a simple level of authentication.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS (Embedded JavaScript templates)

## Getting Started

### Prerequisites

Make sure you have the following software installed:

- Node.js: [Download](https://nodejs.org/)
- MongoDB: [Download](https://www.mongodb.com/try/download/community)

## Usage
- The project includes several routes:

- /- Home page with options to register or login.
- /register - Registration page.
- /login - Login page.
- /secrets - A protected page that can only be accessed after a successful login.
- /submit - A page for submitting secrets.

## Authentication
-This project implements a basic level of authentication. User registration is handled on the /register route, and login is managed on the /login route. Here's a summary of the authentication process:

- Users can register with their email and password.
- Users can log in using their registered email and password.
- If the email and password match a registered user, they gain access to the /secrets page.
- Users are redirected to the /home page if authentication fails.
