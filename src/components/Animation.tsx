'use client'
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export function gsapText(ref: React.RefObject<HTMLDivElement>, duration: number, text: string, delay: number) {
  if (ref.current) {
    gsap.to(ref.current, {
    duration: duration,
    text: text,
    ease: 'none',
    delay: delay,
    });
  }
};

interface TD {
  text: string | undefined,
  duration: number,
}
export function gsapMultiText(elements:TD[], refs:React.RefObject<HTMLDivElement>[],) {
  refs.forEach((ref, index) => {
    if (ref.current) {
      gsap.to(ref.current, {
        duration: elements[index].duration,
        text: elements[index].text,
        ease: "none",
        delay: index * 1,
      });
    }
  })
};

export function gsapLeftElement (selector: string, duration: number, delay: number, stagger: number) {
  const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
  elements.forEach((element, index) => {
    gsap.set(element, {pointerEvents: 'none'});
    gsap.fromTo(
      element,
      {
        x: -200,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: duration,
        delay: delay + index * stagger,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(element, {pointerEvents: 'auto'});
        }
      }
    )
  })
};

export function gsapRightElement (selector: string, duration: number, delay: number, stagger: number) {
  const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
  elements.forEach((element, index) => {
    gsap.set(element, {pointerEvents: 'none'});
    gsap.fromTo(
      element,
      {
        x: +200,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: duration,
        delay: delay + index * stagger,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(element, {pointerEvents: 'auto'});
        }
      }
    )
  })
};

export function gsapFadeElement (selector: string, duration: number, delay: number) {
  const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
  elements.forEach((element, index) => {
    gsap.set(element, {pointerEvents: 'none'});
    gsap.fromTo(
      element,
        {
          opacity: 0
        },
        {
        opacity: 1,
        duration: duration + index * .5,
        delay: delay,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(element, {pointerEvents: 'auto'});
        }
      });
    }
  )
};

export function gsapBottomElement (selector: string, duration: number, delay: number, stagger: number) {
  const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
  elements.forEach((element, index) => {
    gsap.set(element, {pointerEvents: 'none'});
    gsap.fromTo(
      element,
      {
        y: +200,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: duration,
        delay: delay + index * stagger,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(element, {pointerEvents: 'auto', clearProps: 'transform, opacity'});
        }
        
      }
    );
  });
};

export function gsapTopElement (selector: string, duration: number, delay: number, stagger: number) {
  const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
  elements.forEach((element, index) => {
    gsap.set(element, {pointerEvents: 'none'});
    gsap.fromTo(
      selector,
      {
        y: -200,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: duration,
        delay: delay + index * stagger,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(element, {pointerEvents: 'auto', clearProps: 'transform, opacity'});
        }
      }
    );
  });
};

export function gsapRotateCounterClockwise(selector: string, duration: number, rotationAmount: number) {

  let animation: GSAPTween;
  const element = document.querySelector(selector) as HTMLElement;
  if (!element) return;
  element.addEventListener('mouseenter', () => {
    animation = gsap.to(element, {
      rotation: `+=${rotationAmount}`,
      duration: duration,
      repeat: -1,
      ease: "linear"
    });
  });

  element.addEventListener('mouseleave', () => {
    if (animation) {
      animation.pause();
    }
  });
}