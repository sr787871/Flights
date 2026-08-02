# ✈️ Airplane Booking System — Microservices Backend

A production-grade airline booking system built with **Node.js**, **TypeScript**, and a **microservices architecture**. All traffic flows through a centralized **API Gateway** that enforces authentication, rate limiting, and HTTP observability.

---

## 📐 Architecture Overview

```
                        ┌─────────────────────────────────────┐
  Client / Swagger UI   │       API GATEWAY  (Port 4000)      │
        │               │  • JWT Auth (edge verification)      │
        └──────────────►│  • Rate Limiting (100 req/15 min)   │
                        │  • Morgan HTTP Logging               │
                        │  • Reverse Proxy to microservices    │
                        │  • Universal Swagger UI (/api-docs)  │
                        └─────────────┬────────────────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              ▼                       ▼                       ▼
  ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐
  │   User Service       │ │   Flight Service     │ │  Booking Service    │
  │   Port 5001          │ │   Port 3000          │ │  Port 8080          │
  │                      │ │                      │ │                     │
  │  • Signup / Login    │ │  • Flights CRUD      │ │  • Create Booking   │
  │  • JWT + Refresh     │ │  • Airplanes CRUD    │ │  • Make Payment     │
  │  • Forgot/Reset Pwd  │ │  • Airports CRUD     │ │  • Cancel Booking   │
  │  • Role Management   │ │  • Cities CRUD       │ │  • Circuit Breaker  │
  │  • Zod Validation    │ │  • Search & Filter   │ │  • Cron Auto-cancel │
  │                      │ │  • Pagination        │ │  • Pagination       │
  └──────────┬───────────┘ └──────────┬───────────┘ └──────────┬──────────┘
             │                        │                         │
             ▼                        ▼                         ▼
       [ users_db ]             [ flights_db ]            [ bookings_db ]
         (MySQL)                  (MySQL)                    (MySQL)
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js + TypeScript |
| Framework | Express.js |
| ORM | Sequelize v6 (MySQL) |
| Authentication | JWT (Access Token 15m + Refresh Token 7d) |
| Validation | Zod |
| Logging | Winston + Morgan (Gateway) |
| API Docs | Swagger UI (OpenAPI 3.0) |
| Circuit Breaker | Opossum.js |
| Rate Limiting | express-rate-limit |
| Scheduler | node-cron |
| Proxy | http-proxy-middleware |

---

## 📁 Project Structure

```
Airplane-Booking/
├── API-GATEWAY/              # Central entry point (Port 4000)
│   └── src/
│       ├── config/           # Env config, Winston logger
│       ├── middlewares/      # JWT auth, Rate limiter, Morgan logger
│       └── proxies/          # http-proxy-middleware setup
│
├── User-Service/             # Auth & user management (Port 5001)
│   └── src/
│       ├── config/           # Env, DB, logger, Swagger spec
│       ├── controllers/      # Request handlers
│       ├── services/         # Business logic
│       ├── repositories/     # Data access layer
│       ├── models/           # Sequelize models (User, RefreshToken)
│       ├── routes/           # Express routes
│       ├── schemas/          # Zod validation schemas
│       └── middlewares/      # Auth guard, Rate limiter, Zod validator
│
├── Flights_Project/          # Flight & inventory management (Port 3000)
│   └── src/
│       ├── controllers/      # Airplane, Airport, City, Flight controllers
│       ├── services/         # Business logic per entity
│       ├── repositories/     # Data access layer
│       ├── models/           # Sequelize models
│       ├── routes/           # Express routes (v1)
│       ├── schemas/          # Zod schemas
│       ├── middlewares/      # Zod validator, requireRole guard
│       └── migrations/       # Sequelize migrations
│
└── Flights-Booking-Service/  # Booking & payment processing (Port 8080)
    └── src/
        ├── controllers/      # Booking controller
        ├── services/         # Booking service (circuit breaker integrated)
        ├── repositories/     # Data access layer
        ├── models/           # Booking model
        ├── routes/           # Express routes (v1)
        ├── schemas/          # Zod schemas
        ├── middlewares/      # Zod validator, requireRole guard
        └── utils/
            └── circuit-breaker.ts  # Opossum factory
```

---

## ⚙️ Prerequisites

- **Node.js** v18+ — [Download](https://nodejs.org/)
- **MySQL** v8+ — running locally on port `3306`
- **npm** v9+

---

## 🚀 Setup & Installation

### Step 1 — Clone the repository

```bash
git clone <your-repo-url>
cd Airplane-Booking
```

### Step 2 — Create MySQL databases

Open your MySQL client and run:

```sql
CREATE DATABASE users_db;
CREATE DATABASE flights_db;
CREATE DATABASE bookings_db;
```

### Step 3 — Configure environment variables

Create a `.env` file in **each** service directory (copy from the examples below):

#### `API-GATEWAY/.env`
```env
PORT=4000
JWT_SECRET=your_super_secret_jwt_key_here
USER_SERVICE_URL=http://localhost:5001
FLIGHT_SERVICE_URL=http://localhost:3000
BOOKING_SERVICE_URL=http://localhost:8080
ALLOWED_ORIGINS=*
NODE_ENV=development
```

#### `User-Service/.env`
```env
PORT=5001
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRY=15m
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=users_db
NODE_ENV=development
```

#### `Flights_Project/.env`
```env
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=flights_db
NODE_ENV=development
```

#### `Flights-Booking-Service/.env`
```env
PORT=8080
FLIGHT_SERVICE=http://localhost:3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=bookings_db
NODE_ENV=development
```

> ⚠️ **Important:** The `JWT_SECRET` must be **identical** across `API-GATEWAY` and `User-Service`. The Gateway verifies tokens signed by User Service.

### Step 4 — Install dependencies

Run in each service folder:

```bash
cd API-GATEWAY           && npm install && cd ..
cd User-Service          && npm install && cd ..
cd Flights_Project       && npm install && cd ..
cd Flights-Booking-Service && npm install && cd ..
```

### Step 5 — Run database migrations (Flights & Booking services)

```bash
# Flight Service
cd Flights_Project
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all   # Optional: seed sample data
cd ..

# Booking Service
cd Flights-Booking-Service
npx sequelize-cli db:migrate
cd ..
```

> The **User Service** auto-syncs its schema on startup (`sequelize.sync({ alter: true })`), so no manual migration is needed.

### Step 6 — Start all services

Open **4 separate terminals** and run one command per terminal:

```bash
# Terminal 1 — User Service (start first)
cd User-Service && npm run dev

# Terminal 2 — Flight Service
cd Flights_Project && npm run dev

# Terminal 3 — Booking Service
cd Flights-Booking-Service && npm run dev

# Terminal 4 — API Gateway (start last)
cd API-GATEWAY && npm run dev
```

### Step 7 — Verify everything is running

| Service | URL | Expected Response |
|---------|-----|-------------------|
| API Gateway | `http://localhost:4000/health` | `{"status":"ok","service":"API-GATEWAY"}` |
| User Service | `http://localhost:5001/health` | `{"status":"ok","service":"User-Service"}` |
| Flight Service | `http://localhost:3000/health` | `{"status":"ok","service":"Flights-Service"}` |
| Booking Service | `http://localhost:8080/health` | `{"status":"ok","service":"Flights-Booking-Service"}` |
| Universal Swagger UI | `http://localhost:4000/api-docs` | Swagger UI with 3-service dropdown |

---

## 🌐 API Reference

> **All API calls should go through the Gateway on port 4000.**
> Use the Universal Swagger UI at `http://localhost:4000/api-docs` to explore and test all APIs interactively.

### 🔐 Authentication Flow

```
1. POST /api/v1/users/signup    → Get accessToken + refreshToken
2. Use accessToken in: Authorization: Bearer <token>
3. POST /api/v1/users/refresh-token  → Get new accessToken when expired
4. POST /api/v1/users/logout         → Revoke refreshToken
```

### 👤 User Service — `http://localhost:4000/api/v1/users`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `POST` | `/signup` | ❌ | — | Register new user |
| `POST` | `/login` | ❌ | — | Login, get access + refresh token |
| `POST` | `/refresh-token` | ❌ | — | Issue new access token |
| `POST` | `/logout` | ✅ | Any | Revoke refresh token |
| `POST` | `/forgot-password` | ❌ | — | Generate password reset token |
| `POST` | `/reset-password` | ❌ | — | Reset password with token |
| `GET` | `/profile` | ✅ | Any | Get own profile |
| `PATCH` | `/profile` | ✅ | Any | Update name/role |

**User Roles:** `user` · `admin` · `flight_company`

---

### ✈️ Flight Service — `http://localhost:4000/api/v1`

#### Flights
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `GET` | `/flights` | ✅ | Any | Search & list flights (paginated) |
| `GET` | `/flights/:id` | ✅ | Any | Get flight details |
| `POST` | `/flights` | ✅ | `admin`, `flight_company` | Create flight |
| `DELETE` | `/flights/:id` | ✅ | `admin` | Delete flight |
| `PATCH` | `/flights/:id/seats` | ✅ (internal) | — | Reserve/restore seats |

**Flight Search Query Params:**
```
GET /api/v1/flights?trips=DEL-BOM&price=1000-5000&tripDate=2026-12-25&sort=price_ASC&page=1&limit=10
```

#### Airplanes
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `GET` | `/airplanes` | ✅ | Any | List all airplanes |
| `GET` | `/airplanes/:id` | ✅ | Any | Get airplane details |
| `POST` | `/airplanes` | ✅ | `admin`, `flight_company` | Create airplane |
| `DELETE` | `/airplanes/:id` | ✅ | `admin` | Delete airplane |
| `PATCH` | `/airplanes/:id` | ✅ | `admin` | Update airplane |

#### Airports & Cities
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/airports` | Create airport (linked to a city) |
| `GET` | `/airports` | List all airports |
| `POST` | `/cities` | Create city |

---

### 🎫 Booking Service — `http://localhost:4000/api/v1/bookings`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `POST` | `/` | ✅ | `user`, `admin` | Initiate booking (reserves seats) |
| `POST` | `/payment` | ✅ | `user`, `admin` | Confirm payment → status: `booked` |
| `POST` | `/:id/cancel` | ✅ | `user`, `admin` | Cancel booking (restores seats) |
| `GET` | `/:id` | ✅ | Any | Get booking details |
| `GET` | `/` | ✅ | Any | Get user bookings (paginated) |

**Booking Status Flow:**
```
INITIATED  →  (payment)  →  BOOKED
    │
    └─ (no payment within 5 min OR manual cancel) → CANCELLED
```

**Pagination:**
```
GET /api/v1/bookings?page=1&limit=10
Response includes: { data: [...], meta: { page, limit, total, totalPages } }
```

---

## 🏛️ Service Roles Explained

### API Gateway (Port 4000) — The Front Door
Every single API request enters the system here. The Gateway:
- **Verifies the JWT token** at the edge before any request reaches a microservice
- **Injects user context** (`x-user-id`, `x-user-email`, `x-user-role`) as headers into downstream requests — so microservices trust the Gateway, not re-verify tokens
- **Rate limits** all traffic to 100 requests per IP per 15 minutes
- **Logs every HTTP request** (method, URL, status, response time) via Morgan → Winston
- **Serves the Universal Swagger UI** aggregating all 3 microservice specs into one portal

### User Service (Port 5001) — Auth & Identity
The only service that knows passwords and issues tokens:
- Signup/Login with **bcrypt** password hashing (Sequelize `beforeCreate` hooks)
- Issues **15-minute access tokens** + **7-day refresh tokens** (stored in DB for revocation)
- Handles forgot/reset password via JWT-signed reset tokens (15m expiry)
- Manages **role-based user accounts** (`user` / `admin` / `flight_company`)

### Flight Service (Port 3000) — Inventory Management
Owns all flight-related data and seat inventory:
- CRUD for **Flights**, **Airplanes**, **Airports**, and **Cities**
- Advanced **search & filtering** — by route (`DEL-BOM`), price range, date, with multi-field sorting
- **Seat management** — atomically decrements/restores available seats when bookings are created/cancelled
- Write operations protected by **role-based middleware** (`requireRole`)

### Booking Service (Port 8080) — Reservation & Payment
Orchestrates the booking lifecycle across services:
- Uses **database transactions** for all operations (atomic rollback on failure)
- Communicates with Flight Service via **Opossum circuit breaker** — if Flight Service is down, returns a clean 503 instantly instead of hanging
- Runs a **node-cron job every 30 minutes** to auto-cancel `INITIATED` bookings older than 5 minutes (prevents seat inventory lock-up)
- Returns paginated booking history with full `meta` block

---

## 🔒 Security Architecture

```
Client Request
     │
     ▼
[API Gateway]
  ├── Rate Limit check (reject if exceeded)
  ├── JWT verification (reject with 401 if invalid/missing)
  ├── Injects x-user-id, x-user-email, x-user-role headers
     │
     ▼
[Microservice]
  ├── requireRole() checks x-user-role header (reject 403 if insufficient)
  ├── Zod schema validates request body/params/query
     │
     ▼
[Controller → Service → Repository → Database]
```

**Public routes** (no JWT required):
- `POST /api/v1/users/signup`
- `POST /api/v1/users/login`
- `POST /api/v1/users/refresh-token`
- `POST /api/v1/users/forgot-password`
- `POST /api/v1/users/reset-password`
- `GET /health`

---

## 🔄 Booking Workflow — Step by Step

```
1. User signs up → POST /api/v1/users/signup
   → Returns: { accessToken, refreshToken }

2. Search for a flight → GET /api/v1/flights?trips=DEL-BOM&tripDate=2026-12-25

3. Initiate booking → POST /api/v1/bookings
   Body: { flightId: 1, noOfSeats: 2 }
   → Booking created (status: INITIATED), seats reserved on Flight Service

4. Complete payment → POST /api/v1/bookings/payment
   Body: { bookingId: 1, userId: 1, totalCost: 9000 }
   → Booking confirmed (status: BOOKED)

5. (Optional) Cancel → POST /api/v1/bookings/1/cancel
   → Booking cancelled, seats restored on Flight Service

⏱️  Auto-cancel: If step 4 is skipped, the cron job cancels the booking
    and restores seats after 5 minutes.
```

---

## 📊 Resilience Patterns

| Pattern | Where | Config |
|---------|-------|--------|
| **Circuit Breaker** | Booking → Flight Service calls | Opens after 50% error rate, resets after 15s |
| **Rate Limiting** | API Gateway | 100 requests / IP / 15 minutes |
| **DB Transactions** | Booking Service | Full ACID rollback on any failure |
| **Refresh Tokens** | User Service | DB-backed, individually revocable |
| **Auto-cancel Cron** | Booking Service | Every 30 min, cancels stale INITIATED bookings |

---

## 📚 API Documentation

The **Universal Swagger UI** at `http://localhost:4000/api-docs` provides interactive documentation for all 3 microservices. Use the **dropdown in the top right** to switch between:
- 👤 **User Service APIs**
- ✈️ **Flight Service APIs**
- 🎫 **Booking Service APIs**

Each service also has its own local Swagger UI:
- User Service: `http://localhost:5001/api-docs`
- Flight Service: `http://localhost:3000/api-docs`
- Booking Service: `http://localhost:8080/api-docs`

---

## 🐛 Common Issues

**`SequelizeConnectionError` on startup**
- Ensure MySQL is running: `mysql -u root -p`
- Check credentials in your `.env` match your MySQL setup

**`401 Unauthorized` on all requests**
- Make sure `JWT_SECRET` is the same in `API-GATEWAY/.env` and `User-Service/.env`
- Include `Authorization: Bearer <accessToken>` header

**Circuit Breaker returning 503**
- Flight Service (Port 3000) is not running
- Start it with `cd Flights_Project && npm run dev`

**Booking auto-cancelled immediately**
- The cron job cancels `INITIATED` bookings older than 5 minutes
- Complete the payment step within 5 minutes of creating a booking

---

## 🏗️ Available Scripts

Each service supports these npm scripts:

```bash
npm run dev     # Start in development mode (tsx watch — hot reload)
npm run build   # Compile TypeScript to JavaScript
npm run start   # Run compiled JavaScript (production)
```

For Flights & Booking services (Sequelize CLI):
```bash
npx sequelize-cli db:migrate          # Run pending migrations
npx sequelize-cli db:migrate:undo     # Rollback last migration
npx sequelize-cli db:seed:all         # Seed sample data
npx sequelize-cli db:seed:undo:all    # Remove seeded data
```
