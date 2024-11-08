'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function NavbarComponent() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const accessToken = session?.access_token;
  console.log("access token: " , accessToken);
  const handleLogout = () => {
    signOut({redirect: false});
    router.push("/");
  }

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
          {isLoggedIn ? (
            <div className="flex justify-center items-center ">
            <div className="dropdown relative">
              {/* Profile button to open dropdown */}
              <div tabIndex="0" role="button" className="m-1">
                {session?.user?.image ? (
                  <Image
                    src={session?.user?.image}
                    alt="profile"
                    width={50}
                    height={50}
                  />
                ) : (
                  <Image
                    src={"/asset/images/profile.png"}
                    alt="profile"
                    width={50}
                    height={50}
                  />
                )}
              </div>
          
              {/* Dropdown content - Centered */}
              <ul
                tabIndex="0"
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-4 shadow absolute left-1/2 transform -translate-x-1/2 mt-2"
              >
                <li>
                  <a>
                    <Image src={"/asset/images/user.png"} alt="user" width={14} height={14} />
                    <span>
                      {session?.user?.name ? session?.user?.name : session?.user?.email}
                    </span>
                  </a>
                </li>
                <li>
                  <a>
                    <Image src={"/asset/images/setting.png"} alt="setting" width={18} height={18} />
                    Settings
                  </a>
                </li>
                <li>
                  <a>
                    <Image src={"/asset/images/theme.png"} alt="theme" width={20} height={20} />
                    Light Mode
                  </a>
                </li>
                <li>
                  <a onClick={ onClick={handleLogout}}>
                    <Image src={"/asset/images/logout.png"} alt="logout" width={18} height={18} />
                    <span className="text-red-500">Log Out</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          ) : (
            <Link href="/login" className="text-primary font-semibold text-lg">
              Login
            </Link>
          )}

        </div>
      </div>
    </div>
  );
}
