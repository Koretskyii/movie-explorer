# Movie Explorer - Local Setup Guide

This guide will help you set up and run the `movie-explorer` project locally. The project consists of:
- **Client**: Next.js frontend application
- **Server**: NestJS backend and Prisma ORM

Both parts require HTTPS to function correctly.

---

## 📋 Prerequisites
- **Node.js**: (recommended v18+ or v20+)
- **mkcert**: A simple tool for making locally-trusted development certificates

---

## 🔐 1. Setting up HTTPS Certificates

Since the client and server use secure connections (`https://`), you need to generate and configure local SSL certificates.

1. Generate certificates using `mkcert` in the project root:
   ```bash
   mkcert -install
   mkcert localhost 127.0.0.1 ::1
   ```
   This will generate two files (usually `localhost+2.pem` and `localhost+2-key.pem`).

2. Copy the generated certificates to their respective folders:
   
   **For the Server** (folder `server/`):
   - Rename the certificate file (without 'key' in the name) to `cert.crt`.
   - Rename the key file (with 'key' in the name) to `cert.key`.
   - Place these files directly in the `server/` root folder and the `server/certificates/` folder.

   **For the Client** (folder `client/certificates/`):
   - Copy the certificate file (without 'key') here as `localhost.pem`.
   - Copy the key file (with 'key') here as `localhost-key.pem`.

---

## ⚙️ 2. Environment Variables (.env)

This project uses environment variables that are not checked into version control. You must create them manually.

### Server (`server/.env`)
Create an `.env` file in the `server` directory and add the following variables:
```env
# Database connection string (e.g., Supabase PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/postgres"

# TMDB API Token (The Movie Database)
TMDB_TOKEN="your_tmdb_token_here"

# Authentication JWT secrets
JWT_SECRET="your_jwt_secret"
JWT_REFRESH_SECRET="your_jwt_refresh_secret"
```

### Client (`client/.env.local`)
Create an `.env.local` file in the `client` directory and specify the backend API URL:
```env
NEXT_PUBLIC_NEST_URL=https://localhost:3011
```

---

## 🛠 3. Running the Server (NestJS)

Open a terminal and navigate to the `server` folder:

```bash
cd server

# 1. Install dependencies
npm install

# 2. Generate Prisma Client (syncs database types)
npx prisma generate

# 3. Synchronize database schema (optional, if you need to update the DB)
npx prisma db push

# 4. Start the server in Development Mode
npm run start:dev
```
The server will now be listening at: **https://localhost:3011**

*Note: If you encounter an error saying certificates are not found, double-check that `cert.key` and `cert.crt` are placed in the correct directories.*

---

## 💻 4. Running the Client (Next.js)

Open another terminal and navigate to the `client` folder:

```bash
cd client

# 1. Install dependencies
npm install

# 2. Start the development server with HTTPS support
npm run https
```
Once it compiles successfully, the client will be accessible at: **https://localhost:3000**

---

## 🎉 You're All Set!
You can now open [https://localhost:3000](https://localhost:3000) in your browser to interact with the application. Since we're using certificates from `mkcert`, your browser should display the connection as "Secure".
