'use server'
import { createClient } from '@supabase/supabase-js';
import { ProjectData } from '@/types';

const supabase = createClient(
  process.env.DB_URL!,
  process.env.DB_KEY!
);
export default async function getProjects(): Promise<ProjectData[] | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: true });
  if (error) {
    return null;
  }
  return data ?? null;
}