"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function NavbarComponent() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const accessToken = session?.access_token;
  console.log("access token: ", session);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter()

  const handleDropdownToggle = () => setShowDropdown(!showDropdown);
  
  const handleLogout = () => {
    signOut({redirect: false});
    router.push("/");
  }


  return (
    <div>
      <div className="navbar bg-base-100 font-semibold text-primary">
        <div className="navbar-start">
          <div>
            <Link href="/">
              <Image
                src="/asset/images/logo2.png"
                alt="GPT_LOGO"
                width={50}
                height={50}
              />
            </Link>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-lg">
            <li>
              <Link href="/" className={pathname === "/" ? "font-bold" : ""}>
                Overview
              </Link>
            </li>
            <li>
              <Link
                href="/playground"
                className={pathname === "/playground" ? "font-bold" : ""}
              >
                Playground
              </Link>
            </li>
            <li>
              <Link
                href="/docs/allApps"
                className={pathname === "/docs" ? "font-bold" : ""}
              >
                Docs
              </Link>
            </li>
       
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
                  <button onClick={handleLogout}>
                    <Image src={"/asset/images/logout.png"} alt="logout" width={18} height={18} />
                    <span className="text-red-500">Log Out</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          ) : (
            <Link href="/login" className="text-primary font-semibold text-lg">
              Login
            </Link>
          )}

          {/* {showDropdown && (
        <div className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg p-4">
          <div className="flex flex-col items-center mb-4">
            <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-primary font-semibold text-3xl">
              {session?.user?.image ? <Image src={session?.user?.image} alt="profile" width={50} height={50}/> : <Image src={"/asset/images/profile.png"} alt="profile" width={50} height={50}/>}
            </div>
            <p className="font-semibold text-lg mt-2">{session?.user?.name || 'User'}</p>
          </div>
          <div className="text-gray-600 text-md w-full">
            <button className="flex items-center gap-2 w-full py-2 px-3 hover:bg-gray-100">
              <span className="material-icons">account_circle</span> Settings
            </button>
            <button className="flex items-center gap-2 w-full py-2 px-3 hover:bg-gray-100">
              <span className="material-icons">brightness_6</span> Light Mode
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full py-2 px-3 text-red-600 hover:bg-gray-100"
            >
              <span className="material-icons">logout</span> Log out
            </button>
          </div>
        </div>
      )} */}
        </div>
      </div>
    </div>
  );
}
