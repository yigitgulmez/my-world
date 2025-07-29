import { AiOutlineGithub } from 'react-icons/ai';
import { HiOutlineDownload } from 'react-icons/hi';
import { config } from './config';

type IconType = React.ComponentType;

const otherLinks: Record<string, { href: string; icon: IconType }[]> = {
  'cs2-shop-url-creator': [{ href: `https://github.com/${config.githubOwner}/cs2-shop-url-creator/`, icon: HiOutlineDownload }],
};

const linkLists: Record<string, { href: string; icon: IconType }[]> = {};

config.repos.forEach((repo) => {
  const repoName = repo.name;
  const autoLink = {
    href: `https://github.com/${config.githubOwner}/${repoName}/`,
    icon: AiOutlineGithub,
  };

  linkLists[repoName] = [autoLink, ...(otherLinks[repoName] || [])];
});

export default linkLists;