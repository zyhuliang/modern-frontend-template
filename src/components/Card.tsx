import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className = '', hover = false, ...props }: CardProps) => {
  const baseStyles =
    'bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 relative overflow-hidden';

  const hoverStyles = hover
    ? 'hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer'
    : '';

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/50 dark:to-blue-900/10 pointer-events-none rounded-2xl" />

      <div className="relative z-10">{children}</div>
    </div>
  );
};
