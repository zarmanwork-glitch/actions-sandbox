# GitHub Actions Sample App

A simple Express.js application for practicing GitHub Actions CI/CD workflows.

## Setup

Install dependencies:

```bash
bun install
```

## Running the app

**Development mode** (with auto-reload):

```bash
bun run dev
```

**Production mode**:

```bash
bun run start
```

The server runs on `http://localhost:3000` by default.

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check
- `POST /api/echo` - Echo service (requires `message` in body)

## Testing

```bash
bun run test
```

## Linting

```bash
bun run lint
```

## Building

```bash
bun run build
```

## GitHub Actions

This repo is ready for GitHub Actions workflows. Create `.github/workflows/*.yml` files to:
- Run tests on every push/PR
- Lint code for quality
- Build artifacts
- Deploy to staging/production

---

Built with [Bun](https://bun.com) and Express.js
# actions-sandbox
