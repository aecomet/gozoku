# Gozoku is a marvelous man in the world.

**[page](https://aecomet.github.io/gozoku)**!

## Tech Stack

- **Vue 3** + **TypeScript** + **Vite 8**
- **Vue Router 5** (hash history / 遅延ロード)
- **Leaflet 2** (地図)
- **SCSS** (スタイル)
- **Brotli圧縮** (vite-plugin-compression)
- **pnpm 11** — パッケージマネージャ
- **Lefthook** — pre-commit (format check) + pre-push (AI code review)

## Developer documentation

### Quick Preview

```sh
docker run -p 8888:80 --rm ghcr.io/aecomet/gozoku
# => http://localhost:8888/
```

### Set up for local

```sh
# install node
node -v
# => 26.3.0

npm i -g pnpm

pnpm install

pnpm run dev
# => Local:   http://localhost:8888/
```

### Test

```sh
pnpm test
# Vitest: 4 pages, 3 components, 21 tests
```

### Build

```sh
pnpm run build
# => build/
```

## CI/CD

| Trigger      | Workflow          | Description                         |
| ------------ | ----------------- | ----------------------------------- |
| push to main | `app-release.yml` | Build → Deploy to Pages → Docker    |
| Pull Request | `ci.yml`          | Format check + Build                |
| pre-commit   | lefthook          | Format check                        |
| pre-push     | lefthook          | AI code review (blocker/high gates) |

## Architecture

詳細は [docs/architecture.md](docs/architecture.md) を参照してください。
