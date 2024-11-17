"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getLM } from "@/actions/modelAction";

export default function NavbarComponent() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const accessToken = session?.access_token;
  const [lmData, setLmData] = useState(null); // State to store fetched data
  const [darkMode, setDarkMode] = useState(false);
  const handleLogout = () => {
    signOut({ redirect: false });
    router.push("/");
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Initialize theme from localStorage
    const storedTheme = localStorage.getItem("theme") || "light";
    const html = document.documentElement;
    if (storedTheme === "dark") {
      html.classList.add("dark");
      setDarkMode(true);
    } else {
      html.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const fetchLM = async () => {
      try {
        const data = await getLM(); // Fetch data from the action
        setLmData(data); // Store the data in state
        console.log("Fetched LM Data:", data);
      } catch (error) {
        console.error("Error fetching LM data:", error);
      }
    };

    fetchLM();
  }, []);

  console.log("lmdata", lmData);

  return (
    <div>
      <div className="navbar bg-base-100 font-semibold text-primary dark:bg-gray-900 dark:text-white">
        <div className="navbar-start">
          <div className="flex">
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

        {isLoggedIn ? (
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
        ) : (
          ""
        )}

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
                  className="dropdown-content  dark:bg-gray-900 menu bg-base-100 rounded-box z-[1] w-64 p-4 shadow absolute left-1/2 transform -translate-x-1/2 mt-2"
                >
                  <li>
                    <a>
                      <Image
                        src={"/asset/images/user.png"}
                        alt="user"
                        width={14}
                        height={14}
                      />
                      <span>
                        {session?.user?.name
                          ? session?.user?.name
                          : session?.user?.email}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <Image
                        src={"/asset/images/setting.png"}
                        alt="setting"
                        width={18}
                        height={18}
                      />
                      {/* You can open the modal using document.getElementById('ID').showModal() method */}
                      <button
                        className="text-left "
                        onClick={() =>
                          document.getElementById("my_modal_3").showModal()
                        }
                      >
                        Settings
                      </button>
                      <dialog id="my_modal_3" className="modal">
                        <div className="modal-box w-full max-w-3xl p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                          {/* Close Button */}
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
                              <Image
                                src={"/asset/images/cross.png"}
                                alt="close"
                                width={30}
                                height={30}
                              />
                            </button>
                          </form>

                          {/* Modal Header */}
                          <h3 className="font-bold pb-3 text-primary dark:text-white border-b border-primary dark:border-gray-700 text-2xl">
                            Settings
                          </h3>

                          {/* Content Grid */}
                          <div className="grid grid-cols-4">
                            {/* Sidebar */}
                            <div className="col-span-1 border-r p-4 text-lg text-primary dark:text-gray-300 border-primary dark:border-gray-700">
                              Custom Model
                            </div>

                            {/* Main Content */}
                            <div className="col-span-3 p-4">
                              <div className="flex justify-between mb-5">
                                <div>
                                  <h1 className="text-lg font-bold text-primary dark:text-white">
                                    Model Configuration
                                  </h1>
                                </div>
                                <div className="flex justify-end space-x-3">
                                  <button className="px-4 py-2 border border-primary text-gray-600 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
                                    Secrets & API keys
                                  </button>
                                  <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-indigo-700">
                                    Save
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                Access tokens authenticate your identity to the
                                Hugging Face Hub and allow applications to
                                perform actions based on token permissions.
                              </p>

                              {/* Configuration Fields */}
                              <div className="gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Provider
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Default"
                                    className="w-full p-3 border my-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:focus:ring-gray-600"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Model
                                  </label>
                                  <input
                                    type="text"
                                    placeholder={
                                      lmData?.payload?.provider_info?.model_name
                                    }
                                    className="w-full p-3 border my-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:focus:ring-gray-600"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      Temperature
                                    </label>
                                    <input
                                      type="number"
                                      placeholder={lmData?.payload?.temperature}
                                      className="w-full p-3 my-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:focus:ring-gray-600"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      Max Length
                                    </label>
                                    <input
                                      type="number"
                                      placeholder={lmData?.payload?.max_token}
                                      className="w-full p-3 my-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:focus:ring-gray-600"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </dialog>
                    </a>
                  </li>
                  <li>
                    <a>
                      <Image
                        src={"/asset/images/theme.png"}
                        alt="theme"
                        width={20}
                        height={20}
                      />
                      <span className="cursor-pointer" onClick={toggleTheme}>
                        {darkMode ? "Dark Mode" : "Light Mode"}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>
                      <Image
                        src={"/asset/images/logout.png"}
                        alt="logout"
                        width={18}
                        height={18}
                      />
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
