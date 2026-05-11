-- Auth.js PostgreSQL adapter schema
-- Cloud SQL instance: thechaoan:asia-east1:pgsql-thechaoan, database: postgres
-- Run this once against the instance before first deploy

DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS verification_token;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT,
  email TEXT,
  "emailVerified" TIMESTAMPTZ,
  image TEXT
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT
);

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" TEXT NOT NULL UNIQUE
);

CREATE TABLE verification_token (
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,
  PRIMARY KEY (identifier, token)
);
