import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  padding = 'md',
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const CardComponent = hover ? motion.div : 'div';
  const motionProps = hover
    ? {
        whileHover: { 
          y: -2,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        },
        transition: { duration: 0.2 }
      }
    : {};

  return (
    <CardComponent
      className={cn(
        'bg-white rounded-lg border border-gray-200 shadow-sm',
        paddingClasses[padding],
        hover && 'cursor-pointer transition-shadow',
        className
      )}
      {...motionProps}
    >
      {children}
    </CardComponent>
  );
};

export default Card;
