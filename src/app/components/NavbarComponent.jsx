'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function NavbarComponent() {
  const pathname = usePathname();

  return (
    <div>
      <div className="navbar bg-base-100 font-semibold text-primary">
        <div className="navbar-start">
          <div className='flex'>
            <Link href="/">
              <Image 
                src="/asset/images/logo2.png" 
                alt="GPT_LOGO" 
                width={50} 
                height={50} 
              />
            </Link>
            {/* <p className='m-auto font-bold text-xl p-3'>TexBot</p> */}
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-lg">
            <li>
              <Link href="/" className={pathname === '/' ? 'font-bold' : ''}>
                Overview
              </Link>
            </li>
            <li>
              <Link href="/docs/allApps" className={pathname === '/docs' ? 'font-bold' : ''}>
                Docs
              </Link>
            </li>
            {/* <li>
              <Link href="/examples" className={pathname === '/examples' ? 'font-bold' : ''}>
                Examples
              </Link>
            </li>
            <li>
              <Link href="/about" className={pathname === '/about' ? 'font-bold' : ''}>
                About
              </Link>
            </li> */}
          </ul>
        </div>

        <div className="navbar-end text-xl">
          <Link href="/login" className={pathname === '/login' ? 'font-bold' : ''}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
