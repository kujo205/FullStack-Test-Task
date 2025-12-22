# Full-stack Developer Assessment Task


## How to run this repo

In order to run this repo, please follow these steps:
1. Clone the repository:

   ```bash
   git clone
   ```
   
2 .**Install dependencies**:

   ```bash
   pnpm install
   ```

3 .**Copy env files while being in root directory**:

   ```bash
   cp apps/api/.env.example apps/api/.env
   cp apps/web/.env.example apps/web/.env
   ```

4 .**Ensure you have docker runnning**:

5 .**Run docker**:

```bash
    docker-compose up --build
```

After some time, the backend server together with frontend server and db should be running. You can access the application at `http://localhost:3000`.

Good luck exploring the code!

## Project Structure

The task requirements are available at [this link](/TASK.md).

This project is configured as a monorepo using **Turborepo**. I chose this approach to maintain two distinct projects running in separate processes, ensuring a clean boundary between the frontend and backend.

### Core Applications

- **`apps/web`**: Frontend application built with **React**, **TypeScript**, and **TanStack Router** (implemented as an architectural experiment). Detailed information regarding frontend architectural decisions can be found in the [Architecture Guide](./ARCHITECTURE.md).
- **`apps/api`**: Backend service built with **Node.js**, **TypeScript**, and **Hono**. Detailed information regarding backend architectural decisions can be found in the [Architecture Guide](./ARCHITECTURE.md).

### Shared Packages

- **`packages/biome-config`**: Centralized configuration for **Biome** (handling both linting and formatting).
- **`packages/typescript-config`**: Shared **tsconfig** base used across the entire monorepo to ensure type consistency.
