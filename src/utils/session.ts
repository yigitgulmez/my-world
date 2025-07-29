import { ProjectData } from '@/types';

const SESSION_KEY = 'projectsData';

export function saveSession(data: ProjectData[]) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }
}

export async function getSession(): Promise<ProjectData[] | null> {
  if (typeof window === 'undefined') return null;

  const data = sessionStorage.getItem(SESSION_KEY);
  if (!data) return null;

  try {
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
}
