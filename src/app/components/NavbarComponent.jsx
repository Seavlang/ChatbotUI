import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function NavbarComponent() {
  return (
    <div>
       <div className="navbar bg-base-100 font-semibold text-primary">
        <div className="navbar-start">
            <div>
            <Image 
                src="/asset/images/logo.png" 
                alt="GPT_LOGO" 
                width={40} 
                height={40}
            />
            </div>
        </div>
        <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-lg">
            <li>
                <Link href="/playground">
                Playground
                </Link>
            </li>
            <li>
                <Link href="/docs">
                Docs
                </Link>
            </li>
            <li>
                <Link href="/examples">
                Examples
                </Link>
            </li>
            <li>
                <Link href="/about">
                About
                </Link>
            </li>
        </ul>
        </div>
        <div className="navbar-end text-2xl">
            <a className="">Login</a>
        </div>
       </div>
    </div>
  );
}
