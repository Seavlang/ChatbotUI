"use client";
import Image from "next/image";
import React from "react";
import allapp from "/public/asset/images/allapp.png";
import overview from "/public/asset/images/overview.png";
import example from "/public/asset/images/example.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarComponent() {
  const pathname = usePathname();

  const overviewLink = [
    {
      label: "Quick Start",
      pathname: "/docs/overview/quickStart",
    },
    {
      label: "REST API Overview",
      pathname: "/docs/overview/restApi",
    }
  ]

  return (
    <div>
      <div className=" font-semibold">
        <div className="">
          <ul className="mx-10 text-md w-[80%]  leading-10 mt-10 space-y-1">
            {/* All Apps */}
            <li>
              <Link
                href="/docs/allApps"
                className={
                  pathname === "/docs/allApps"
                    ? "bg-[#d3e2f2] px-4 flex items-center rounded-lg text-primary"
                    : "px-4 flex items-center"
                }
              >
                {
                  pathname === "/docs/allApps" ?
                    <div className="mr-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="6" height="6" rx="1" transform="matrix(1 0 0 -1 14 10)" stroke="#004B93" strokeLinecap="round" />
                        <path d="M10 14H14C14.9428 14 15.4142 14 15.7071 14.2929C16 14.5858 16 15.0572 16 16V18C16 18.9428 16 19.4142 15.7071 19.7071C15.4142 20 14.9428 20 14 20H10V14Z" stroke="#004B93" strokeLinecap="round" />
                        <path d="M10 10C10 9.05719 10 8.58579 9.70711 8.29289C9.41421 8 8.94281 8 8 8H6C5.05719 8 4.58579 8 4.29289 8.29289C4 8.58579 4 9.05719 4 10V14H10V10Z" stroke="#004B93" strokeLinecap="round" />
                        <path d="M10 20H6C5.05719 20 4.58579 20 4.29289 19.7071C4 19.4142 4 18.9428 4 18V14H10V20Z" stroke="#004B93" strokeLinecap="round" />
                      </svg>
                    </div>
                    :
                    <div className="mr-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="6" height="6" rx="1" transform="matrix(1 0 0 -1 14 10)" stroke="#000000" strokeLinecap="round" />
                        <path d="M10 14H14C14.9428 14 15.4142 14 15.7071 14.2929C16 14.5858 16 15.0572 16 16V18C16 18.9428 16 19.4142 15.7071 19.7071C15.4142 20 14.9428 20 14 20H10V14Z" stroke="#000000" strokeLinecap="round" />
                        <path d="M10 10C10 9.05719 10 8.58579 9.70711 8.29289C9.41421 8 8.94281 8 8 8H6C5.05719 8 4.58579 8 4.29289 8.29289C4 8.58579 4 9.05719 4 10V14H10V10Z" stroke="#000000" strokeLinecap="round" />
                        <path d="M10 20H6C5.05719 20 4.58579 20 4.29289 19.7071C4 19.4142 4 18.9428 4 18V14H10V20Z" stroke="#000000" strokeLinecap="round" />
                      </svg>
                    </div>
                }



                All Apps
              </Link>
            </li>

            {/* Overview */}
            <li className="px-4 flex items-center">
              <Image src={overview} width={24} height={24} alt="overview" className="mr-4" />
              Overview
            </li>

            {
              overviewLink.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.pathname}
                    className={
                      pathname === item.pathname
                        ? "bg-[#d3e2f2] px-4 flex items-center rounded-lg ml-10 text-primary"
                        : "font-normal px-4 ml-10 flex items-center"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))

            }


            {/* Example */}
            <li>
              <Link
                href="/docs/example"
                className={
                  pathname === "/docs/example"
                    ? "bg-[#d3e2f2] px-4 flex items-center rounded-lg text-primary"
                    : "px-4 flex items-center"
                }
              >
                <div className="mr-4">
                  {
                    pathname === "/docs/example" ?
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="5" width="17" height="14" rx="2" stroke="#33363F" />
                        <path d="M7 10L9 12L7 14" stroke="#33363F" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 14H16" stroke="#33363F" strokeLinecap="round" />
                      </svg>
                      :
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="5" width="17" height="14" rx="2" stroke="#000000" />
                        <path d="M7 10L9 12L7 14" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 14H16" stroke="#000000" strokeLinecap="round" />
                      </svg>
                  }



                </div>
                Example
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
