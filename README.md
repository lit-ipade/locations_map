# 🌍 User Locations - LIT

Sistema que recebe localizações de vários apps Flutter e as exibe em um mapa interativo.

## Estrutura
| Pasta | Descrição |
|--------|------------|
| `/api` | API Node.js + MongoDB que recebe e armazena localizações |
| `/src` | Front-end que mostra as localizações em um mapa Leaflet |

## Instalação

### Backend
```bash
cd api
cp .env.example .env
npm install
node server.js
