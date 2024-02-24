# Contributing

Please take a moment to review this document befire submitting your first pull request.

If you need any help, feel free to reach out to [@LightBounded](https://github.com/LightBounded) or join our [Discord](https://discord.gg/7ZEHzTAEan).

## About

This repository is a monorepo using [Turborepo](https://turbo.build/repo/) and [pnpm](https://pnpm.io/) containing:

```text
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ expo
  |   ├─ Expo SDK 49
  |   ├─ React Native using React 18
  |   ├─ Navigation using Expo Router
  |   ├─ Tailwind using NativeWind
  |   └─ Typesafe API calls using tRPC
  └─ next.js
      ├─ Next.js 14
      ├─ React 18
      ├─ Tailwind CSS
      └─ E2E Typesafe API Server & Client
packages
  ├─ api
  |   └─ tRPC v11 router definition
  ├─ auth
  |   └─ Authentication using Lucia
  ├─ db
  |   └─ Typesafe db calls using Drizzle & Turso
  ├─ ui
  |   └─ Start of a UI package for the webapp using shadcn-ui
  └─ validators
      └─ Shared schema validation logic using zod
tooling
  ├─ eslint
  |   └─ shared, fine-grained, eslint presets
  ├─ prettier
  |   └─ shared prettier configuration
  ├─ tailwind
  |   └─ shared tailwind configuration
  └─ typescript
      └─ shared tsconfig you can extend from
```

## Quick Start

### 1. Set up dependencies

```bash
# Install dependencies
pnpm i

# Confgiure environment variables
cp .env.example .env
```

### 2. Set up the database

```bash
# Run the database
pnpm dev -F db

# Push the Drizzle schema to the database
pnpm db:push
```

### 3. Run a workspace

You can use the `pnpm dev --filter=<WORKSPACE>` or `pnpm dev -F <WORKSPACE>` to run a workspace.

```bash
# Run the next.js app
pnpm dev -F nextjs

# Run the expo app
pnpm dev -F expo
```
