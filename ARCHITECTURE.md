# Project Architecture

This document outlines the architectural patterns, technical decisions, and project structure used in this monorepo.

---

## 🏗 High-Level Overview

The project is organized as a **Monorepo** managed by **Turborepo** and **pnpm workspaces**. It is designed to maintain a strict separation between the frontend and backend to ensure scalability, ease of testing, and clear boundaries.

### Project Structure
- **`apps/api`**: Backend service built with Node.js, Hono, and Kysely.
- **`apps/web`**: Frontend application built with React, TanStack Router, and Tailwind CSS.
- **`packages/`**: Shared configurations (Biome, TypeScript) to ensure consistency across the repo.

---

## 🛠 Backend Architecture (`apps/api`)

The backend follows a **Pragmatic Hexagonal Architecture** (Ports and Adapters). While following the core principles of decoupling business logic from technical implementation, some simplifications were made for speed and maintainability.

### Layered Organization
1.  **Core (Domain Layer):**
    * **Services:** Contains the business logic and orchestration (e.g., GitHub API interactions).
    * **Models:** Pure types derived from the database schema using `kysely-codegen`.
    * *Decision:* Repository interfaces were skipped to avoid over-engineering, as the database is unlikely to change in the short term.
2.  **Infrastructure (Implementation Layer):**
    * **HTTP (Hono):** Entry point for requests, handling routing and validation via Zod.
    * **Database:** PostgreSQL managed via Kysely for type-safe SQL queries.
    * **Repositories:** Concrete data access logic.

### Background Processing
The system satisfies the "background addition" requirement by acknowledging repository creation requests immediately and performing the GitHub API data enrichment asynchronously. Currently, this is handled in-process, allowing the user to continue using the app while the data is fetched and stored.

---

## 🎨 Frontend Architecture (`apps/web`)

The frontend is built with **React** and structured according to **Feature-Sliced Design (FSD)**.

### Layering (FSD)
- **Shared:** Reusable UI components (Shadcn/UI), utilities, and API wrappers.
- **Features:** Logic that provides specific business value (e.g., `AddRepo`, `RepoList`).
- **Pages:** Composed of features and shared components to represent full views.

### Key Technologies
- **TanStack Router:** Provides 100% type-safe routing, ensuring that links and navigation are checked at compile-time.
- **Shadcn/UI & Tailwind:** Modern, accessible UI components with high customization.
- **Vite:** High-performance build tool for a fast development loop.

---

## 🧪 Testing Strategy

The project utilizes a **"Flipped Testing Pyramid"** strategy:
- **Integration Tests (High Focus):** The majority of testing is done at the integration level. Each test file runs in an isolated Docker environment with a real PostgreSQL database (cleared between runs) to ensure high confidence in the end-to-end flow.
- **Unit Tests:** Used selectively for isolated business logic within the Core layer.
- **Vitest:** The primary runner for all tests, chosen for its speed and native TypeScript support.

To run the tests, use the following command in the root of the monorepo:

```bash
pnpm run test:api
```

---

## 🛠 Tooling & Developer Experience

- **Biome:** Used as an all-in-one formatter and linter. It replaces Prettier and ESLint, providing significantly faster execution and a simplified configuration.
- **Turborepo:** Orchestrates builds, linting, and formatting with an intelligent cache to minimize redundant work.
- **Docker & Docker Compose:** Containerizes the database and test environments to ensure the "it works on my machine" guarantee across different developer setups.

---

## 📋 Summary of Decisions

| Choice | Reason |
| :--- | :--- |
| **Monorepo** | To keep frontend/backend in one place while maintaining strict project boundaries. |
| **Hexagonal Logic** | To keep business logic (Services) independent of the HTTP framework (Hono). |
| **Kysely** | For type-safe SQL without the "magic" and performance overhead of heavy ORMs. |
| **TanStack Router** | To catch routing errors during development rather than at runtime. |
| **Biome** | For high-performance linting/formatting in a single tool. |
