import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { component: string[] } }
) {
  const name = params.component.join('/');
  const file = path.join(process.cwd(), 'public/r', `${name}.json`);

  if (!fs.existsSync(file)) {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 });
  }

  return NextResponse.json(JSON.parse(fs.readFileSync(file, 'utf-8')));
}
