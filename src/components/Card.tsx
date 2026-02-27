import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className = '', hover = false, ...props }: CardProps) => {
  const baseStyles = 'bg-white dark:bg-slate-900 rounded-2xl p-6';

  const hoverStyles = hover
    ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer'
    : '';

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
