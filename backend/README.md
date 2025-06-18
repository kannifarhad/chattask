# NestJS Real-time Chat

## Features

- WebSocket-based real-time messaging
- REST API for fetching chat history
- Prisma ORM (SQLite for local development, PostgreSQL for production)
- Dockerized for local and production environments
- Layered architecture with a modular monolith structure
- Environment-based configuration using `.env.production`
- Structured logging using Pino
- Unit testing with Jest
- API documentation via Swagger at `http://localhost:9000/api`

## Project Setup

1. Copy `.env.example` to `.env` and adjust variables as needed:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies and generate Prisma client:
   ```bash
   npm install
   npm run db:generate
   ```

## Running the Project

```bash
# Start in development mode
npm run start

# Start with hot-reload enabled
npm run start:dev

# Optionally seed the database with generated messages
npm run db:seed
```

## Running Tests

```bash
# Run unit tests
npm run test
```

## API Endpoints

- `GET /messages` — Fetch chat history
- `POST /auth/login` — Log in to the chat
- `GET /healthcheck` — Healthcheck endpoint

## Architecture & Design

This project follows a **modular monolith architecture** designed for simplicity and ease of development, especially suited for demo and MVP scenarios.

### Key Architectural Features

#### Modular Monolith

- All chat-related functionality, including messaging, is encapsulated within a single `ChatModule`.
- Keeps the codebase organized with clear boundaries.
- Facilitates quick development and easy maintenance for demo or small projects.

#### Layered Architecture

- **DTOs (Data Transfer Objects):** Define the shape of input and output data for API and WebSocket communication.
- **Entities:** Represent core domain models, such as `MessageEntity`, encapsulating business data.
- **Services:** Contain business logic and orchestrate operations (e.g., `CreateMessageUseCase`).
- **Repositories:** Abstract data persistence, interacting with the database through Prisma.
- **Gateways / Controllers:** Handle external communication, including WebSocket events and REST endpoints.

This separation enhances **testability**, **maintainability**, and **extensibility** of the application.

#### Prisma ORM as Data Mapper

- Uses Prisma for type-safe database access and schema management.
- Acts as a data mapper between the database and application entities.
- Supports SQLite for quick local development and PostgreSQL for production deployments.

#### Real-Time Communication

- The `ChatGateway` leverages WebSockets to enable real-time message exchange.
- Delegates message creation and persistence to the use case layer.
- Pushes updates to all connected clients instantly.

#### Database Choice: SQLite for Development, PostgreSQL for Production

- SQLite is chosen for ease of setup with zero external dependencies, ideal for demos and local development.
- PostgreSQL is recommended for production environments for its robustness and scalability.
- Switching databases requires minimal configuration changes thanks to Prisma’s database-agnostic design.

### Future Considerations

- To scale or add complexity, the app can evolve into a microservices architecture, separating chat, user management, and notifications.
- Introducing CQRS or event sourcing patterns can enhance handling of complex domain logic.
- Adding caching layers (e.g., Redis) will improve performance under load.
- Implementing authentication and authorization is essential for securing chat communications in production.

---

This design balances developer experience with practical considerations for scalability and maintainability.

