import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import { TD } from '@/types';
gsap.registerPlugin(TextPlugin);

export function gsapText(
  elements: TD[],
  refs: (HTMLElement | null)[]
) {
  refs.forEach((el, i) => {
    if (!el) return;
    gsap.to(el, {
      duration: elements[i].duration,
      text: elements[i].text,
      ease: 'none',
      delay: i * 0.35,
    });
  });
}

export function gsapLeftElement(
  elements: (HTMLElement | null)[],
  duration: number,
  delay: number,
  stagger: number
) {
  elements.forEach((el, index) => {
    if (!el) return;
    gsap.fromTo(
      el,
      { 
        x: -200, 
        opacity: 0, 
        visibility: 'visible' 
      },
      {
        x: 0,
        opacity: 1,
        duration,
        delay: delay + index * stagger,
        ease: 'power3.out',
      }
    );
  });
}

export function gsapRightElement(
  elements: (HTMLElement | null)[],
  duration: number,
  delay: number,
  stagger: number
) {
  elements.forEach((element, index) => {
    if (!element) return;
    gsap.fromTo(
      element,
      { 
        x: 200, 
        opacity: 0, 
        visibility: 'visible' 
      },
      {
        x: 0,
        opacity: 1,
        duration,
        delay: delay + index * stagger,
        ease: 'power3.out',
      }
    );
  });
}

export function gsapFadeElement(
  elements: (HTMLElement | null)[],
  duration: number,
  delay: number,
  stagger: number
) {
  elements.forEach((element, index) => {
    if (!element) return;
    gsap.fromTo(
      element,
      { 
        opacity: 0, 
        visibility: 'visible' 
      },
      {
        opacity: 1,
        duration: duration + index * 0.5,
        delay: delay + index * stagger,
        ease: 'power3.out',
      }
    );
  });
}

export function gsapBottomElement(
  elements: (HTMLElement | null)[],
  duration: number,
  delay: number,
  stagger: number
) {
  elements.forEach((element, index) => {
    if (!element) return;
    gsap.fromTo(
      element,
      { 
        y: 200,
        opacity: 0,
        visibility: 'visible' 
      },
      {
        y: 0,
        opacity: 1,
        duration,
        delay: delay + index * stagger,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(element, {
            pointerEvents: 'auto',
            clearProps: 'transform, opacity',
          });
        },
      }
    );
  });
}
export function gsapTopElement(
  elements: (HTMLElement | null)[],
  duration: number,
  delay: number,
  stagger: number
) {
  elements.forEach((element, index) => {
    if (!element) return;
    gsap.fromTo(
      element,
      {
        y: -200,
        opacity: 0,
        visibility: 'visible' 
      },
      {
        y: 0,
        opacity: 1,
        duration: duration,
        delay: delay + index * stagger,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(element, {clearProps: 'transform, opacity'});
        }
      }
    );
  });
}