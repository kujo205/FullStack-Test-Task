# API Architecture

This document describes the architecture of the API application located in `apps/api`.  
The goal of this architecture is to provide **clear separation of concerns**, **testability**, and **scalability**, while avoiding unnecessary complexity.

The project loosely follows **Hexagonal Architecture (Ports & Adapters)** principles, with intentional simplifications where appropriate.

---

## High-Level Overview

The API is divided into two main layers:

- **Core (Domain Layer)** – business logic and domain concepts
- **Infrastructure Layer** – technical details such as HTTP, database, authentication, and persistence

src/
├── core # Domain logic (framework-agnostic)
└── infra # Adapters & infrastructure (HTTP, DB, auth, etc.)


The `core` layer does **not depend** on the `infra` layer.  
The `infra` layer depends on `core` and wires everything together.

---

## Core Layer (`src/core`)

The core layer contains the **business logic** of the application.  
It is intentionally kept free from HTTP, database, and framework-specific concerns.

### Entities (`src/core/entities`)

Entities represent the **domain concepts** of the application.


