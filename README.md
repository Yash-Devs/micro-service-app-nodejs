# Microservices-Based Application

## Overview
This project is a microservices-based application built using **Node.js**, **Express**, and **Docker**. It follows a modular architecture with separate services handling authentication, user management, and a gateway service to route requests.

## Architecture
The application consists of the following services:

- **Gateway Service**: Acts as a central entry point for routing requests to appropriate microservices.
- **Auth Service**: Handles user authentication, registration, and token generation.
- **User Service**: Manages user-related operations such as profile updates.
<!-- - **Database**: (Optional) Each service can have its own database (e.g., MongoDB, PostgreSQL) depending on requirements. -->

## Technologies Used
- **Node.js** (Express framework)
- **Docker & Docker Compose**
- **Webpack** (for bundling)
- **Bcrypt** (for password hashing)
- **JWT** (for authentication)

## Design Flow
1. **Client Request**: A request is sent to the Gateway Service.
2. **Routing**: The Gateway determines which microservice should handle the request.
3. **Authentication**: If required, the Auth Service validates authentication.
4. **Processing**: The respective microservice processes the request and interacts with the database if needed.
5. **Response**: The processed response is sent back through the Gateway Service to the client.

                         
## Deployment Instructions
1. **Clone the Repository**
    ```sh
    git clone https://github.com/Yash-Devs/micro-service-app-nodejs.git
    cd micro-service-app-nodejs
    ```

2. **Set Up Environment Variables**
    Create an `.env` file using .env.example inside each service (gateway, auth-service, user-service) with the required configuration.

3. **Build and Run Services with Docker**
    Ensure Docker and Docker Compose are installed, then run:
    ```sh
    docker-compose up --build
    ```

    This command:
    - Builds the Docker images for each microservice
    - Runs them within a Docker network
    - Exposes the services on the respective ports

4. **Verify Running Containers**
    ```sh
    docker ps
    ```

    This should display the gateway-service, auth-service, and user-service running on their respective ports.

5. **Access the Application**
    - **Gateway Service**: [http://localhost:4000](http://localhost:4000)
    - **Auth Service**: [http://localhost:4001](http://localhost:4001)
    - **User Service**: [http://localhost:4002](http://localhost:4002)

6. **Testing API Endpoints**
    Use Postman or cURL to test the API endpoints:

    **Register a User**
    ```sh
    curl -X POST http://localhost:4000/register -H "Content-Type: application/json" -d '{"email":"test@example.com", "userName": "user", "password":"securepass"}'
    ```

    **Authenticate User**
    ```sh
    curl -X POST http://localhost:4000/login -H "Content-Type: application/json" -d '{"userName":"user", "password":"securepass"}'
    ```

## Troubleshooting
1. **Node.js Version Issues**
    Ensure your local Node.js version matches the one inside the Docker container (e.g., Node 20).

2. **Docker Build Issues**
    If a service fails to start, rebuild the containers with:
    ```sh
    docker-compose up --build --force-recreate
    ```

## Future Enhancements
- Integrating MongoDB for database storage. ✅
- Implement Rate Limiting for API requests. ✅
- Add GraphQL support. ✅
- Improve logging with Winston.
- Introduce Kafka or RabbitMQ for async messaging.

## License
This project is licensed under the MIT License.