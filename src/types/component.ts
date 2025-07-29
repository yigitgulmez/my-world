export interface ProjectsComponentProps {
  img: { name: string; url: string }[] | string;
  title: string;
  description: string;
  href: string;
  isLive: boolean;
}

export interface SocialProps {
  href: string;
  icon: React.ReactNode;
}
export interface SkillProps {
  icon: React.ReactNode;
}

export interface TD {
  text: string,
  duration: number,
}