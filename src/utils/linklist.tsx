import { ReactNode } from 'react';
import { AiOutlineGithub } from 'react-icons/ai';
const linkLists: Record<string, { href: string; icon: ReactNode }[]> = {
  // 'my_world': [
  //   { href: 'https://Example.com', icon: <AiOutlineLink/> },
  // ],
  'my_world': [
    { href: 'https://github.com/yigitgulmez/my_world/', icon: <AiOutlineGithub/> },
  ],
};

export default linkLists;