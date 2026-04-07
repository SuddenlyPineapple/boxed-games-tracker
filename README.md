# 🎮 Boxed Games Tracker

A self-hosted web app for managing your physical console game collection. Track what you own, what you want, and what you've spent — all from a sleek dark-themed dashboard.

![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8?logo=pwa&logoColor=white)

## ✨ Features

- **📊 Stats Dashboard** — total games, owned vs. wanted, money spent, per-platform breakdown with visual progress bars
- **🔍 Search & Filter** — find games by name, filter by platform (Xbox 360 / Xbox One / PS4), bought status, and priority
- **📝 Full CRUD** — add, edit (modal), and delete games with all fields
- **📱 PWA Support** — install on your phone's home screen, works offline with service worker caching
- **🌙 Dark Theme** — easy on the eyes, game-collection vibe

## 🗂️ Game Fields

| Field | Description |
|-------|-------------|
| Name | Game title |
| Platform | Xbox 360, Xbox One, PS4, etc. |
| Price (Allegro) | Listed price on Allegro |
| Price (Vinted/OLX) | Listed price on Vinted/OLX |
| Price Paid | What you actually paid |
| Priority | 1–10 scale (visualized as colored bars) |
| Max Players | Local multiplayer count |
| Bought | ✅ Owned or ❌ Wishlist |

## 🚀 Quick Start

### Docker Compose (recommended)

```bash
git clone git@github.com:SuddenlyPineapple/boxed-games-tracker.git
cd boxed-games-tracker
docker compose up -d --build
```

App will be available at **http://localhost:8888**

### Without Docker

```bash
npm install
node server.js
```

App will be available at **http://localhost:3000**

## 🏗️ Architecture

```
boxed-games-tracker/
├── server.js              # Express REST API
├── package.json
├── Dockerfile             # Node 20 Alpine
├── docker-compose.yml     # Port 8888 → 3000
├── data/
│   └── games.json         # 📦 JSON database (mounted as volume)
└── public/
    ├── index.html         # Single-page app (HTML/CSS/JS)
    ├── manifest.json      # PWA manifest
    ├── sw.js              # Service worker (cache-first + offline)
    └── icons/
        ├── icon-192.png   # PWA icon
        └── icon-512.png   # PWA splash icon
```

## 🔌 API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/games` | List all games |
| `POST` | `/api/games` | Add a new game |
| `PUT` | `/api/games/:id` | Update a game |
| `DELETE` | `/api/games/:id` | Delete a game |

### Example: Add a game

```bash
curl -X POST http://localhost:8888/api/games \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Halo 3",
    "platform": "Xbox 360",
    "maxPlayers": 4,
    "priority": 9,
    "bought": false
  }'
```

## 📦 Data Persistence

Games are stored in `data/games.json` — a plain JSON file mounted as a Docker volume. No database server needed. Back it up by simply copying the file.

## 📱 PWA

The app is installable as a Progressive Web App:

1. Open in Chrome/Safari on your phone
2. Tap "Add to Home Screen"
3. Enjoy native-app experience with offline support

## 🛠️ Configuration

| Env Variable | Default | Description |
|-------------|---------|-------------|
| `DATA_FILE` | `/app/data/games.json` | Path to JSON database |
| Port mapping | `8888:3000` | Adjust in `docker-compose.yml` |

## 📜 License

MIT
