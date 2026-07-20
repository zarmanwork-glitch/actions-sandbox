# TypeScript Configuration Fix

## What Was Wrong

The original `tsconfig.json` had this line:

```json
"extends": "express/tsconfig/strict"
```

This extends TypeScript configuration from the Express framework package, which is designed for Node.js/Express projects.

## Why This Was Wrong

1. **Framework Mismatch**: This project uses **Bun** (a modern JavaScript runtime), not Express/Node.js. Extending Express's config creates confusion and potential incompatibilities.

2. **Your project is already properly configured for Bun** — the `compilerOptions` already include:
   - `"types": ["bun"]` — tells TypeScript about Bun's global APIs
   - `"moduleResolution": "bundler"` — correct for Bun's bundler
   - `"module": "Preserve"` — lets Bun handle module transformation

## The Fix

**Remove the `extends` line entirely.** Your config already has everything Bun needs.

```json
{
  "compilerOptions": {
    // ... all your existing settings
  }
}
```

## Why This Fix Works

- **Bun is self-sufficient**: Unlike Node.js projects that often inherit from shared configs, Bun's setup is straightforward
- **Your config is complete**: All necessary compiler options are explicitly set
- **No conflicts**: You avoid pulling in Express/Node.js assumptions that don't apply to Bun

## Key Takeaway for Intro Projects

When setting up TypeScript in an intro repo, ask yourself:

1. **What runtime am I using?** (Node.js? Bun? Browser?)
2. **Do I need to extend a base config?** (Usually only if you have multiple related projects that share settings)
3. **Are all my compiler options explicitly set?** (If yes, extending adds complexity without benefit)

In this case: Bun runtime ✓ → Single project ✓ → All options explicit ✓ → Don't extend anything

---

## Build Script Configuration

## What Was Wrong in package.json

The original build script had:

```json
"build": "bunx build"
```

This is incomplete and invalid — `bun build` requires a file argument.

## Build Script Fix

```json
"build": "bun build ./src/index.ts --outdir dist"
```

## Why This Works

- **`bun build`** — Bun's native build tool (not `bunx`, which runs packages)
- **`./src/index.ts`** — The TypeScript file to compile (your entry point from package.json's `module` field)
- **`--outdir dist`** — Outputs the compiled bundle to a `dist` folder (standard convention)

## When to Use the Build Command

- **`npm start`** or **`bun run start`** — Runs the app directly in dev mode
- **`bun run build`** — Compiles to production bundle in `dist/`
- **`bun run dev`** — Runs with hot reload (best for development)

This follows Bun best practices and matches your project's actual structure.
