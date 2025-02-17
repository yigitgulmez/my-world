export interface Project {
  name: string;
  description: string;
  readme: string | null;
  changelog: string | null;
  images: { name: string; url: string }[];
  isLive: boolean;
}

export interface ProjectData {
  title: string;
  description: string;
  readme: string;
  changelog: string;
  img: { name: string; url: string }[];
  url: string;
  live: boolean;
}