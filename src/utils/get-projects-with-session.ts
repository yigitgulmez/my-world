import { ProjectData } from '@/types';
import getProjects from './get-projects';
import { saveSession, getSession } from './session';

export async function getProjectsWithSession(): Promise<ProjectData[] | null> {
  const sessionData = await getSession();
  if (sessionData) return sessionData as ProjectData[];
  const data = await getProjects();
  data && saveSession(data);
  return data;
}

export async function getProjectByTitleWithSession(title: string): Promise<ProjectData | null> {
  const projects = await getProjectsWithSession();
  return projects?.find((p) => p.title === title) || null;
}