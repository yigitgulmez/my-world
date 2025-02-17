import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { projects } = await request.json();
  const filePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
  try {
    fs.writeFileSync(filePath, JSON.stringify(projects, null, 2));
    return NextResponse.json({ message: 'Data written to file successfully!' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error writing to file', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}