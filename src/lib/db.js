import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export function getDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      throw new Error('Database file not found');
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading db.json:', error);
    return null;
  }
}

export function saveDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing db.json:', error);
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
