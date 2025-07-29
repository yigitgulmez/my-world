export interface Project {
  name: string;
  description: string;
  readme: string | null;
  readmeTR: string | null;
  changelog: string | null;
  changelogTR: string | null;
  images: { name: string; url: string }[];
  isLive: boolean;
}


export interface ProjectData {
  title: string;
  description: string;
  readme: string | null;
  readmeTR: string | null;
  changelog: string | null;
  changelogTR: string | null;
  img: { name: string; url: string }[];
  live: boolean;
}


export interface GalleryCompProps {
  img: string;
  alt: string;
}