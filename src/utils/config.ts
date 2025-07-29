import { TbBrandJavascript } from 'react-icons/tb';
import { AiOutlineDiscord, AiOutlineGithub, AiOutlineInstagram, AiOutlineLinkedin } from 'react-icons/ai';
import { BsGit } from 'react-icons/bs';
import { FaAndroid, FaPython, FaReact } from 'react-icons/fa6';
import { PiFileCSharpDuotone, PiFileSqlDuotone } from 'react-icons/pi';
import { RiJavascriptLine, RiTailwindCssFill } from 'react-icons/ri';
import { SiAdobeaftereffects, SiAdobephotoshop, SiNextdotjs } from 'react-icons/si';
import { VscVscodeInsiders } from 'react-icons/vsc';

export const config = {
  username: 'Yiğit',
  fullName: 'Yiğit Gülmez',
  domain: 'yigitgulmez.com',
  githubOwner: 'yigitgulmez',
  repos: [
    { name: 'my-world', isLive: true },
    { name: 'cs2-shop-url-creator', isLive: true },
    { name: 'final-drop', isLive: false },
  ],
  socials: [
    { href: 'https://linkedin.com/in/yigitgulmez', icon: AiOutlineLinkedin },
    { href: 'https://instagram.com/_yigitgulmez', icon: AiOutlineInstagram },
    { href: 'https://discordapp.com/users/528167186511167498', icon: AiOutlineDiscord },
    { href: 'https://github.com/yigitgulmez', icon: AiOutlineGithub },
  ],
  skills: [
    { icon: RiJavascriptLine },
    { icon: TbBrandJavascript },
    { icon: RiTailwindCssFill },
    { icon: FaReact },
    { icon: SiNextdotjs },
    { icon: FaPython },
    { icon: SiAdobephotoshop },   
    { icon: SiAdobeaftereffects },   
    { icon: VscVscodeInsiders },
    { icon: BsGit },
    { icon: PiFileSqlDuotone },
    { icon: PiFileCSharpDuotone },
    { icon: FaAndroid },
  ],  
}