---
applyTo: '**'
---

## Response

- Always respond in Japanese.

## Coding Conventions

- Use meaningful names for variables and functions.
- Keep comments concise and specific.
- Avoid magic numbers; define them as named constants.
- Prioritize code readability.

## Code Review

Always perform a code review before committing. **Before running `git commit`, verify that every item in the checklist below is satisfied. Do not skip this step regardless of how small the change is.**

### Commit Workflow

Always follow this order — never skip a step:

1. Stage changes: `git add`
2. Review staged diff: `git --no-pager diff --staged`
3. Confirm every item in the checklist below is satisfied
4. Review and update `docs/architecture.md` if the project structure or tech stack has changed
5. Review and update `README.md` if setup instructions or feature descriptions are outdated
6. Run `git commit`

### Review Checklist

#### Vue

- Use Composition API (`<script setup>`).
- Ensure `defineProps` / `defineEmits` are properly typed.
- Always specify `:key` on `v-for` directives.
- Do not use `v-if` and `v-for` on the same element.
- Component names must be in PascalCase.
- Avoid unnecessary `watch` or `computed` usage.

#### Vue Router

- Set a `name` for every route definition.
- Use `<RouterLink>` or `router.push()` for navigation; avoid raw `<a>` tags.
- Use `<RouterView>` with a `key` where appropriate to prevent unintended component reuse.
- Apply navigation guards (`beforeEach`, etc.) for authentication and authorization when needed.

### Lint/Format Verification

Run before every commit:
- Format check: `pnpm format:check` (Prettier with EditorConfig rules)
- Lint: `pnpm lint` (if available for this project)
- Auto-fix: `pnpm format` (applies Prettier fixes)

### Route Verification

Before committing, start the dev server and confirm all routes are accessible:

```sh
pnpm dev
```

Manually verify the following routes are reachable without errors:

| Route     | Path                               |
| --------- | ---------------------------------- |
| Home      | `/`                                |
| Schedule  | `/schedule`                        |
| Library   | `/library`                         |
| Not Found | any undefined path (e.g., `/test`) |

### Build Verification

Confirm the build completes successfully before committing:

```sh
pnpm build
```

## Git Commits

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

| Type       | Description                                               |
| ---------- | --------------------------------------------------------- |
| `feat`     | A new feature                                             |
| `fix`      | A bug fix                                                 |
| `docs`     | Documentation changes only                                |
| `style`    | Code style changes (formatting, missing semicolons, etc.) |
| `refactor` | Code changes that neither fix a bug nor add a feature     |
| `perf`     | Performance improvements                                  |
| `test`     | Adding or updating tests                                  |
| `chore`    | Changes to build process, tooling, or dependencies        |
| `ci`       | Changes to CI/CD configuration                            |
| `revert`   | Reverting a previous commit                               |

### Examples

```
feat(schedule): add event filter by year
fix(router): prevent duplicate navigation on back button
docs: update README with setup instructions
chore(deps): upgrade leaflet to v2
```

## Pre-commit Workflow

Lefthook is configured to run automatically:
- `pre-commit`: Runs `pnpm format:check` and (if available) `pnpm lint`
- `pre-push`: Reviews staged changes via `scripts/review-diff.sh`

Before committing, ensure:
1. Stage your changes (`git add`)
2. Lefthook will auto-verify formatting and lint
3. If hooks fail, fix issues and try again

### Package Updates

- Use `npx npm-check-updates -u` to update all packages to latest versions
- Then run `CI=true pnpm install --no-frozen-lockfile` to update lockfile
- Verify with `pnpm build` after updates
