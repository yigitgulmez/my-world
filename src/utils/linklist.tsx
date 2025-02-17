import { ReactNode } from 'react';
import { AiOutlineGithub, AiOutlineLink } from 'react-icons/ai';
import { RxVercelLogo } from 'react-icons/rx';
const linkLists: Record<string, { href: string; icon: ReactNode }[]> = {
  // 'my-world': [
  //   { href: 'https://Example.com', icon: <AiOutlineLink/> },
  // ],
  'my-world': [
    { href: 'https://yeniasd.com', icon: <AiOutlineLink/> },
    { href: 'https://yeniasd.com', icon: <AiOutlineGithub/> },
    { href: 'https://yeniasd.com', icon: <RxVercelLogo/> },
  ],
};

export default linkLists;