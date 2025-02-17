import { useState } from 'react';
import { Project, ProjectData } from '@/utils/interface';
import { useDataUtils } from './datautils';

export const useFetchProjects = () => {
  const { saveFile } = useDataUtils();
  const [newData, setNewData] = useState<ProjectData[]>([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects'); 

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data: Project[] = await response.json();
      const projects = data.map((project) => ({
        title: project.name,
        description: project.description,
        readme: project.readme as string,
        changelog: project.changelog as string,
        img: project.images,
        url: `https://github.com/${process.env.GITHUB_OWNER}/${project.name}`,
        live: project.isLive,
      }));

      await saveFile(projects, null);
      setNewData(projects);

    } catch (err) {
      if (err instanceof Error) {
        saveFile(null, err.message);
    } else {
        saveFile(null, 'An unknown error occurred');
      }
    }
  };
  return { fetchProjects };
}