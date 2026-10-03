import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

// On Vercel, the filesystem is read-only except /tmp.
// Strategy:
//   - Read: try /tmp/db.json first (runtime edits), fallback to bundled data/db.json
//   - Write: always write to /tmp/db.json (persists within the same serverless instance)
const IS_VERCEL = process.env.VERCEL === '1';
const SOURCE_DB = path.join(process.cwd(), 'data', 'db.json');
const RUNTIME_DB = IS_VERCEL ? '/tmp/db.json' : SOURCE_DB;

function ensureRuntimeDb() {
  if (IS_VERCEL && !fs.existsSync(RUNTIME_DB)) {
    // Seed /tmp from the bundled source on cold start
    const source = fs.readFileSync(SOURCE_DB, 'utf8');
    fs.writeFileSync(RUNTIME_DB, source, 'utf8');
  }
}

export function getDb() {
  try {
    ensureRuntimeDb();
    const data = fs.readFileSync(RUNTIME_DB, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading db:', error);
    // Last-resort: try reading directly from source (read-only, always works)
    try {
      const data = fs.readFileSync(SOURCE_DB, 'utf8');
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
}

export function saveDb(data) {
  try {
    fs.writeFileSync(RUNTIME_DB, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing db:', error);
    return false;
  }
}

export function getSettings() {
  const db = getDb();
  return db?.settings || {};
}

export function getServices() {
  const db = getDb();
  return db?.services || [];
}

export function getPortfolio() {
  const db = getDb();
  return (db?.portfolio || []).filter(item => item.published !== false);
}

export function getAllPortfolioAdmin() {
  const db = getDb();
  return db?.portfolio || [];
}

export function getCatalog() {
  const db = getDb();
  return (db?.catalog || []).filter(item => item.published !== false);
}

export function getAllCatalogAdmin() {
  const db = getDb();
  return db?.catalog || [];
}

export function getBlog() {
  const db = getDb();
  return (db?.blog || []).filter(item => item.published !== false);
}

export function getAllBlogAdmin() {
  const db = getDb();
  return db?.blog || [];
}

export function getTestimonials() {
  const db = getDb();
  return db?.testimonials || [];
}
