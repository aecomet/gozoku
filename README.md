# Gozoku is a marvelous man in the world.

**[page](https://aecomet.github.io/gozoku)**!

## Tech Stack

- **Vue 3** + **TypeScript** + **Vite 8**
- **Vue Router 5** (ルーティング・遅延ロード)
- **Leaflet 2** (地図)
- **SCSS** (スタイル)
- **Brotli圧縮** (vite-plugin-compression)

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
# => 24.14.0

npm i -g pnpm

pnpm install

pnpm run dev
# => Local:   http://localhost:8888/
```

### Build

```sh
pnpm run build
# => build/
```

## Architecture

詳細は [docs/architecture.md](docs/architecture.md) を参照してください。
