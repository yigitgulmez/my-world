import { NextRequest, NextResponse } from 'next/server';
import { getGithub, setProjects } from '@/utils';

export async function POST(req: NextRequest) {
  try {
    const event = req.headers.get('X-GitHub-Event');

    if (event !== 'push') {
      return NextResponse.json({ message: 'Event ignored' }, { status: 200 });
    }

    const data = await getGithub();

    if (typeof data === 'string') {
      return NextResponse.json({ message: data }, { status: 500 });
    }

    await setProjects(data);

    return NextResponse.json({ message: 'Processed push event' }, { status: 200 });
  } catch (error) {
    console.error('POST handler error:', error);
    return NextResponse.json({ message: 'Internal server error'}, { status: 500 });
  }
}
