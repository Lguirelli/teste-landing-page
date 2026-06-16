import React, { useEffect, useMemo, useRef, useState } from "https://esm.sh/react@18.3.1";
import { motion } from "https://esm.sh/motion@12.23.24/react?deps=react@18.3.1";

const buildKeyframes = (from, steps) => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((step) => Object.keys(step))
  ]);

  const keyframes = {};

  keys.forEach((key) => {
    keyframes[key] = [from[key], ...steps.map((step) => step[key])];
  });

  return keyframes;
};

const BlurText = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  as = "span"
}) => {
  const elements = useMemo(() => {
    if (animateBy === "letters") return Array.from(text);
    return text.trim().split(/\s+/).filter(Boolean);
  }, [animateBy, text]);

  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5
      },
      {
        filter: "blur(0px)",
        opacity: 1,
        y: 0
      }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, index) =>
    stepCount === 1 ? 0 : index / (stepCount - 1)
  );

  const RootTag = as;

  return React.createElement(
    RootTag,
    {
      ref,
      className: `react-blur-text ${className}`.trim()
    },
    elements.map((segment, index) =>
      React.createElement(
        motion.span,
        {
          className: "react-blur-text__segment",
          key: `${segment}-${index}`,
          initial: fromSnapshot,
          animate: inView ? animateKeyframes : fromSnapshot,
          transition: {
            duration: totalDuration,
            times,
            delay: (index * delay) / 1000,
            ease: easing
          },
          onAnimationComplete:
            index === elements.length - 1 ? onAnimationComplete : undefined
        },
        animateBy === "words" && index < elements.length - 1
          ? `${segment}\u00A0`
          : segment
      )
    )
  );
};

export default BlurText;
