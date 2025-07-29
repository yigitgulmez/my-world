'use server';
import { createClient } from '@supabase/supabase-js';
import { ProjectData } from '@/types';

const supabase = createClient(
  process.env.DB_URL!,
  process.env.DB_KEY!
);

export default async function setProjects(projects: ProjectData[]) {
  for (let i = 1; i < projects.length + 1; i++) {
    const project = projects[i - 1];
    const { error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', i);

    if (error) {
      throw new Error(`Failed to update project: id ${i} - ${error.message || JSON.stringify(error)}`);
    }
  }
}
