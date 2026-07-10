# Agents Guide for gozoku

## Tech Stack

- **Runtime**: Node.js 26.3.0
- **Language**: TypeScript
- **Framework**: Vue 3
- **Router**: Vue Router 5 (hash history)
- **Map**: Leaflet 2 + @maxel01/vue-leaflet
- **Build**: Vite 8
- **Styling**: SCSS
- **Formatter**: Prettier
- **Package manager**: pnpm 11
- **Git hooks**: Lefthook (pre-commit: format check, pre-push: AI review)
- **Container**: Docker (multi-stage: node slim → httpd alpine)

## Reference Documents (read before working)

| File                              | Purpose                                               |
| --------------------------------- | ----------------------------------------------------- |
| `.github/copilot-instructions.md` | Coding conventions, commit workflow, review checklist |
| `docs/architecture.md`            | Project structure, routing, build pipeline            |
| `.agent/tdd/SKILL.md`             | TDD workflow — always follow when writing code        |
| `README.md`                       | Project overview, getting started                     |

## Skills Available

| Skill | File                  | When to use                           |
| ----- | --------------------- | ------------------------------------- |
| `tdd` | `.agent/tdd/SKILL.md` | When writing or modifying source code |

## Key Commands

```sh
pnpm dev           # Start dev server
pnpm build         # Build to build/
pnpm test          # Run Vitest
pnpm format:check  # Check formatting
pnpm format        # Auto-format
```

## Rules

- Always run `pnpm build` before committing.
- Commit messages must follow Conventional Commits.
- Use Vue 3 Composition API for all components.
- Asset files (mp3, images) belong under `src/assets/year/{year}/{season}/`.
