import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function GET() {
  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: 'Failed to read database' }, { status: 500 });
  }
  return NextResponse.json(db);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const success = saveDb(body);
    if (!success) {
      return NextResponse.json({ error: 'Failed to save database' }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: 'Database updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
