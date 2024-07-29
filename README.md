# MyFlixer Backend

This repository contains the backend for MyFlixer, a movie information and user management service. This backend is built with Node.js, Express, and MongoDB, providing a RESTful API for the frontend application. The API is secured using JWT authentication to protect the endpoints.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Testing with Postman](#testing-with-postman)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

MyFlixer backend is designed to handle movie information retrieval and user management, providing a seamless experience for users to access movie details and manage their profiles. This backend service is an essential part of the MyFlixer application, ensuring data integrity and secure access to the application’s resources.

## Features

- **User registration and authentication with JWT**
- **CRUD operations for movie data**
- **User profile management**
- **JWT-secured endpoints to protect user data**
- **Integration with MongoDB for data storage**

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- Body-parser
- Cors
- Nodemon

## Setup and Installation

To set up this project locally, follow these steps:

1. **Clone the repository:**

    ```sh
    git clone https://github.com/Dasheer590/myflixer.git
    cd myflixer
    ```

2. **Navigate to the server directory:**

    ```sh
    cd server
    ```

3. **Install the dependencies:**

    ```sh
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the `server` directory with the following content:

    ```env
    PORT=5000
    CONNECTION_URL=mongodb+srv://<username>:<password>@myflixer.dtfyxsy.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=myflixer
    JWT_SECRET=your_jwt_secret_key
    ```

5. **Start the server:**

    ```sh
    npm start
    ```

## Environment Variables

The project requires the following environment variables to be set:

- `PORT`: The port on which the server runs.
- `CONNECTION_URL`: The MongoDB connection URL.
- `JWT_SECRET`: The secret key for JWT.

## API Endpoints

The following are the main endpoints provided by the API:

### Movies

- **GET** `/movies` - Get all movies
- **GET** `/movies/:id` - Get a single movie by ID
- **POST** `/movies` - Add a new movie
- **PUT** `/movies/:id` - Update a movie by ID
- **DELETE** `/movies/:id` - Delete a movie by ID

### Users

- **POST** `/users/signup` - User registration
- **POST** `/users/login` - User login
- **GET** `/users/:id` - Get user profile
- **PUT** `/users/:id` - Update user profile
- **DELETE** `/users/:id` - Delete user profile

## Authentication

All endpoints are secured with JWT authentication. Users must log in to obtain a JWT token, which should be included in the `Authorization` header as a Bearer token for all subsequent requests.

## Testing with Postman

To test the API endpoints, you can use Postman:

1. **Install Postman**: Download and install Postman from [here](https://www.postman.com/downloads/).

2. **Import Postman Collection**: Import the provided Postman collection (if available) to get all the pre-configured requests.

3. **Set Authorization**: For protected routes, set the Authorization header with the JWT token obtained from the login endpoint.

    ```plaintext
    Authorization: Bearer <your_jwt_token>
    ```

4. **Send Requests**: Use the Postman interface to send requests to the API endpoints and observe the responses.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.






