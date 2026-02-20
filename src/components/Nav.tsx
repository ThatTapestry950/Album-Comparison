
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Compare', href: '/compare' },
  { label: 'History', href: '/history' },
  { label: 'Album Catalog', href: '/albums' },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-6 border-b pb-2 mb-6">
      {navLinks.map(({ label, href }) => {
        const isActive = pathname === href || pathname.startsWith(href + '/');
        return (
          <Link
            key={href}
            href={href}
            className={
              'text-gray-700 hover:underline' +
              (isActive ? ' font-semibold underline' : '')
            }
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
