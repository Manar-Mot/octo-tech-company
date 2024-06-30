import { useSelectedLayoutSegment } from 'next/navigation';
import { ComponentProps, ReactNode } from 'react';
import type { pathnames } from '../../config';
import { Link } from '../../navigation';

interface NavigationLinkProps<Pathname extends string> extends ComponentProps<typeof Link<Pathname>> {
  className?: string;
  children?: ReactNode;
}

export default function NavigationLink<
  Pathname extends keyof typeof pathnames
>({ href, className, children, ...rest }: NavigationLinkProps<Pathname>) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;

  const combinedClassName = [
    'inline-block px-2 py-3 transition-colors',
    isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200',
    className
  ].filter(Boolean).join(' ');

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={combinedClassName}
      href={href}
      {...rest}
    >
      {children}
    </Link>
  );
}
