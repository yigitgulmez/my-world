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
    name: p.title,
    description: p.description,
    readme: p.readme,
    readmeTR: p.readmeTR,
    changelog: p.changelog,
    changelogTR: p.changelogTR,
    images: p.img,
    isLive: p.live
  }));

  const existingProjects = await getProjects();
  if (!existingProjects) {
    throw new Error('Failed to get existing projects');
  }
  const existingNames = existingProjects.map(p => p.title);
  const newNames = mappedProjects.map(p => p.name);

  // 2. Tabloda olup yeni listede olmayanları sil
  const namesToDelete = existingNames.filter(name => !newNames.includes(name));

  if (namesToDelete.length > 0) {
    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .in('name', namesToDelete);

    if (deleteError) {
      throw new Error(`Failed to delete old projects - ${deleteError.message}`);
    }
  }

  const { error: upsertError } = await supabase
    .from('projects')
    .upsert(mappedProjects, { onConflict: 'name' });

  if (upsertError) {
    throw new Error(`Failed to upsert projects - ${upsertError.message}`);
  }
}
