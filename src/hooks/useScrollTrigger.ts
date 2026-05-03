'use client';

import { useEffect, useRef } from 'react';
import type { gsap as GSAPType } from 'gsap';

interface ScrollTriggerOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  onUpdate?: (progress: number) => void;
}

export function useScrollTrigger(
  animationFn: (gsap: typeof GSAPType, trigger: ScrollTrigger) => void,
  options: ScrollTriggerOptions = {}
): React.RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    let gsapInstance: typeof GSAPType;
    let ScrollTriggerModule: typeof ScrollTrigger;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      gsapInstance = gsap;
      ScrollTriggerModule = ScrollTrigger;

      const el = ref.current;
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: options.trigger ?? el,
        start: options.start ?? 'top 80%',
        end: options.end ?? 'bottom 20%',
        scrub: options.scrub,
        pin: options.pin,
        onEnter: options.onEnter,
        onLeave: options.onLeave,
        onEnterBack: options.onEnterBack,
        onLeaveBack: options.onLeaveBack,
        onUpdate: options.onUpdate ? (self) => options.onUpdate!(self.progress) : undefined,
      });

      triggerRef.current = st;
      animationFn(gsap, st);
    };

    init();

    return () => {
      triggerRef.current?.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
