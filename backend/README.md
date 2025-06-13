<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

--- README.md ---
# NestJS Real-time Chat

## Features
- WebSocket real-time messaging
- REST endpoint for fetching message history
- PostgreSQL with Prisma
- Dockerized setup

## Setup
```bash
docker-compose up --build
```

## API
- `GET /messages` — fetch chat history
- WebSocket: connect to `ws://localhost:3000`, emit `message` with `{ username, content }`

## Architecture & Design

This project follows a **modular monolith architecture** designed for simplicity and ease of development, especially suited for demo and MVP scenarios.

### Key Architectural Features

#### Modular Monolith

- All chat-related functionality, including messaging, is encapsulated within a single `ChatModule`.
- Keeps the codebase organized with clear boundaries while avoiding the complexity of microservices.
- Facilitates quick development and easy maintenance for demo or small projects.

#### Layered Architecture

- **DTOs (Data Transfer Objects):** Define the shape of input and output data for API and WebSocket communication.
- **Entities:** Represent core domain models, such as `MessageEntity`, encapsulating business data.
- **Use Cases / Services:** Contain business logic and orchestrate operations (e.g., `CreateMessageUseCase`).
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

