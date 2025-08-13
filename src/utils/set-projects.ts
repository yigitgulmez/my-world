'use server';
import { createClient } from '@supabase/supabase-js';
import { ProjectData } from '@/types';

const supabase = createClient(
  process.env.DB_URL!,
  process.env.DB_KEY!
);

export default async function setProjects(projects: ProjectData[]) {
  const dataWithId = projects.map((project, index) => ({
    id: index + 1,
    ...project
  }));

  const { error } = await supabase
    .from('projects')
    .upsert(dataWithId, { onConflict: 'id' });

  if (error) {
    throw new Error(
      `Failed to upsert projects - ${error.message || JSON.stringify(error)}`
    );
  }
}
