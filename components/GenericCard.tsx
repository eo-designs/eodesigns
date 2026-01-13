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
  display?: 'block' | 'flex' | 'grid' | 'inline-block' | 'inline-flex';

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

  /**
   * Grid column span (e.g., 'col-span-2', 'md:col-span-3')
   */
  colSpan?: string;

  /**
   * Minimum height (e.g., 'min-h-[650px]')
   */
  minHeight?: string;

  /**
   * Maximum width (e.g., 'max-w-2xl')
   */
  maxWidth?: string;

  /**
   * Overflow behavior (e.g., 'overflow-hidden', 'overflow-y-auto')
   */
  overflow?: string;

  /**
   * Position (e.g., 'relative', 'absolute')
   */
  position?: string;

  /**
   * Opacity (e.g., '0.5', 'opacity-75')
   */
  opacity?: string;

  /**
   * Transform utilities (e.g., 'rotate-45', 'scale-110')
   */
  transform?: string;

  /**
   * Transition effects
   */
  transition?: string;

  /**
   * Custom cursor
   */
  cursor?: string;

  /**
   * Pointer events
   */
  pointerEvents?: string;
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
  minHeight,
  maxWidth,
  padding = 'p-0',
  border = 'border border-slate-200',
  borderRadius = 'rounded-2xl',
  backgroundColor = 'bg-white',
  shadow = 'shadow-soft hover:shadow-glow',
  hoverEffect = true,
  gap,
  display = 'block',
  layout,
  overflow,
  position,
  opacity,
  transform,
  transition = 'transition-all duration-300',
  cursor,
  pointerEvents,
  colSpan,
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
  } else if (display === 'inline-flex') {
    displayClass = `inline-flex ${layout || 'flex-col'} ${gap || 'gap-4'}`;
  }

  const hoverClass = hoverEffect ? shadow : '';

  const baseClasses = cn(
    width,
    height,
    minHeight,
    maxWidth,
    padding,
    border,
    borderRadius,
    backgroundColor,
    hoverClass,
    displayClass,
    overflow,
    position,
    opacity,
    transform,
    transition,
    cursor,
    pointerEvents,
    colSpan,
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
