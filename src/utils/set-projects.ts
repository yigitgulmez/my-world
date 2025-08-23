'use server';
import { createClient } from '@supabase/supabase-js';
import { ProjectData } from '@/types';
import getProjects from './get-projects';

const supabase = createClient(
  process.env.DB_URL!,
  process.env.DB_KEY!
);

export default async function setProjects(projects: ProjectData[]) {
  const mappedProjects = projects.map(p => ({
    title: p.title,
    description: p.description,
    readme: p.readme,
    readme_tr: p.readmeTR,
    changelog: p.changelog,
    changelog_tr: p.changelogTR,
    img: p.img,
    live: p.live
  }));

  const existingProjects = await getProjects();
  if (!existingProjects) {
    throw new Error('Failed to get existing projects');
  }
  const existingNames = existingProjects.map(p => p.title);
  const newNames = mappedProjects.map(p => p.title);

  const namesToDelete = existingNames.filter(name => !newNames.includes(name));

  if (namesToDelete.length > 0) {
    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .in('title', namesToDelete);

    if (deleteError) {
      throw new Error(`Failed to delete old projects - ${deleteError.message}`);
    }
  }

  const { error: upsertError } = await supabase
    .from('projects')
    .upsert(mappedProjects, { onConflict: 'title' });

  if (upsertError) {
    throw new Error(`Failed to upsert projects - ${upsertError.message}`);
  }
}
