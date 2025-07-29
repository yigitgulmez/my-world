import { Project, ProjectData } from '@/types/page';
import { config } from './config';

export default async function getGithub(): Promise<ProjectData[] | string> {
  try {
    const response = await fetch(`${config.domain}/api/get-projects`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    const data: Project[] = await response.json();

    const projects = data.map((project) => ({
      title: project.name,
      description: project.description,
      readme: project.readme,
      readmeTR: project.readmeTR,
      changelog: project.changelog,
      changelogTR: project.changelogTR,
      img: project.images,
      live: project.isLive,
    }));

    return projects;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    } else {
      return 'An unknown error occurred';
    }
  }
};
