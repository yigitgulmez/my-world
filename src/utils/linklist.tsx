import { ReactNode } from 'react';
import { AiOutlineGithub } from 'react-icons/ai';
import { RxVercelLogo } from 'react-icons/rx';
const linkLists: Record<string, { href: string; icon: ReactNode }[]> = {
  // 'my-world': [
  //   { href: 'https://Example.com', icon: <AiOutlineLink/> },
  // ],
  'my-world': [
    { href: 'https://yeniasd.com', icon: <RxVercelLogo/> },
    { href: 'https://github.com/yigitgulmez/my_worl', icon: <AiOutlineGithub/> },
  ],
};

export default linkLists;