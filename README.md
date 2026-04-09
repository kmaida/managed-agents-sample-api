# Managed Agents Sample API

A small Express + TypeScript REST API for user management. Built as a sample codebase for [Keycard](https://keycard.dev) + Claude Managed Agents demos.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/users` | List users (optional `?field=name&search=Alice` filter) |
| `GET` | `/api/users/:id` | Get user by ID |
| `POST` | `/api/users` | Create a user |

Data is stored in-memory (resets on restart). Three users are seeded by default.

## Quick start

```bash
npm install
npm run dev    # Start with tsx (development)
npm test       # Run Jest tests (6 passing)
```

## Project structure

```
src/
  index.ts           Express app setup + health endpoint
  db.ts              In-memory user store + query functions
  routes/users.ts    User CRUD endpoints
tests/
  users.test.ts      Happy-path integration tests
scripts/
  deploy.sh          Simulated deployment script
```

## License

MIT
