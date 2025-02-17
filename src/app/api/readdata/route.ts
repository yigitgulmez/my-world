import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'projects.json');

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const projects = JSON.parse(fileContent);
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ message: 'Error reading from file', error: error }, { status: 500 });
  }
}