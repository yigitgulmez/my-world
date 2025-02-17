import { ReactNode } from 'react';
import { AiOutlineGithub } from 'react-icons/ai';
import { RxVercelLogo } from 'react-icons/rx';
const linkLists: Record<string, { href: string; icon: ReactNode }[]> = {
  // 'my_world': [
  //   { href: 'https://Example.com', icon: <AiOutlineLink/> },
  // ],
  'my_world': [
    { href: 'https://my-world-sable.vercel.app', icon: <RxVercelLogo/> },
    { href: 'https://github.com/yigitgulmez/my_worl', icon: <AiOutlineGithub/> },
  ],
};

export default linkLists;