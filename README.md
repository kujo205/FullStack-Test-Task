# Full-stack Developer Assessment Task


## How to run this repo




## Project Structure

The task requirements are available at [this link](/TASK.md).

This project is configured as a monorepo using **Turborepo**. I chose this approach to maintain two distinct projects running in separate processes, ensuring a clean boundary between the frontend and backend.

### Core Applications

- **`apps/web`**: Frontend application built with **React**, **TypeScript**, and **TanStack Router** (implemented as an architectural experiment). Detailed information regarding frontend architectural decisions can be found in the [Architecture Guide](./ARCHITECTURE.md).
- **`apps/api`**: Backend service built with **Node.js**, **TypeScript**, and **Hono**. Detailed information regarding backend architectural decisions can be found in the [Architecture Guide](./ARCHITECTURE.md).

### Shared Packages

- **`packages/biome-config`**: Centralized configuration for **Biome** (handling both linting and formatting).
- **`packages/typescript-config`**: Shared **tsconfig** base used across the entire monorepo to ensure type consistency.
