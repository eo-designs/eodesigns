'use client';

import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GenericCardProps {
  /**
   * CSS class name for additional styling
   */
  className?: string;

  /**
   * Content to render inside the card
   */
  children: React.ReactNode;

  /**
   * Index for staggered animations (0-based)
   */
  index?: number;

  /**
   * Enable scroll-triggered animation
   */
  animated?: boolean;

  /**
   * Custom width (e.g., 'w-full', 'w-96', 'max-w-lg')
   */
  width?: string;

  /**
   * Custom height (e.g., 'h-64', 'min-h-screen')
   */
  height?: string;

  /**
   * Padding around content (e.g., 'p-4', 'px-6 py-8')
   */
  padding?: string;

  /**
   * Custom border color/style (e.g., 'border-blue-500', 'border-2')
   */
  border?: string;

  /**
   * Custom border radius (e.g., 'rounded-lg', 'rounded-3xl')
   */
  borderRadius?: string;

  /**
   * Custom background color/gradient
   */
  backgroundColor?: string;

  /**
   * Custom shadow styling
   */
  shadow?: string;

  /**
   * Hover effect enabled
   */
  hoverEffect?: boolean;

  /**
   * Gap/spacing inside (for flex/grid layouts)
   */
  gap?: string;

  /**
   * Display type (flex or grid layout)
   */
  display?: 'block' | 'flex' | 'grid';

  /**
   * Flex or grid specific properties
   */
  layout?: string;

  /**
   * Custom animation initial state
   */
  animationInitial?: {
    opacity: number;
    y: number;
    scale: number;
  };

  /**
   * Custom animation final state
   */
  animationFinal?: {
    opacity: number;
    y: number;
    scale: number;
  };

  /**
   * Animation duration in seconds
   */
  animationDuration?: number;

  /**
   * Animation easing
   */
  animationEase?: string;

  /**
   * Intersection observer threshold
   */
  observerThreshold?: number;

  /**
   * Callback on animation completion
   */
  onAnimationComplete?: () => void;
}

/**
 * Generic reusable card/container component
 * Supports animations, custom styling, layout modes, and flexible dimensions
 */
export function GenericCard({
  className,
  children,
  index = 0,
  animated = false,
  width = 'w-full',
  height,
  padding = 'p-0',
  border = 'border border-slate-200',
  borderRadius = 'rounded-2xl',
  backgroundColor = 'bg-white',
  shadow = 'shadow-soft hover:shadow-glow',
  hoverEffect = true,
  gap,
  display = 'block',
  layout,
  animationInitial = { opacity: 0, y: 40, scale: 0.92 },
  animationFinal = { opacity: 1, y: 0, scale: 1 },
  animationDuration = 0.6,
  animationEase = 'easeOut',
  observerThreshold = 0.2,
  onAnimationComplete,
}: GenericCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!animated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: observerThreshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [animated, observerThreshold]);

  // Build dynamic class names
  let displayClass = '';
  if (display === 'flex') {
    displayClass = `flex ${layout || 'flex-col'} ${gap || 'gap-4'}`;
  } else if (display === 'grid') {
    displayClass = `grid ${layout || 'grid-cols-1'} ${gap || 'gap-4'}`;
  }

  const hoverClass = hoverEffect ? 'hover:shadow-glow transition-all duration-300' : '';

  const baseClasses = cn(
    width,
    height,
    padding,
    border,
    borderRadius,
    backgroundColor,
    shadow,
    displayClass,
    hoverClass,
    className
  );

  // Non-animated card
  if (!animated) {
    return (
      <div ref={ref} className={baseClasses}>
        {children}
      </div>
    );
  }

  // Animated card with Framer Motion
  return (
    <motion.div
      ref={ref}
      initial={animationInitial}
      animate={hasAnimated ? animationFinal : animationInitial}
      transition={{ duration: animationDuration, delay: index * 0.08, ease: animationEase }}
      onAnimationComplete={onAnimationComplete}
      className={baseClasses}
    >
      {children}
    </motion.div>
  );
}
