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

  return (
    <div>
      <div className="font-semibold">
        <div className="hidden lg:flex">
          <ul className="text-lg leading-10 mt-10 mx-10 space-y-4">
            {/* All Apps */}
            <li>
              <Link
                href="/docs/allApps"
                className={
                  pathname === "/docs/allApps"
                    ? "bg-blue-200 px-4 py-2 flex items-center rounded-lg text-primary"
                    : "flex items-center"
                }
              >
                <Image src={allapp} width={30} height={30} className="mr-4" />
                All Apps
              </Link>
            </li>

            {/* Overview */}
            <li className="flex items-center">
              <Image src={overview} width={30} height={30} className="mr-4" />
              Overview
            </li>

            {/* Quick Start - Nested under Overview */}
            <li>
              <Link
                href="/docs/overview/quickStart"
                className={
                  pathname === "/docs/overview/quickStart"
                    ? "bg-blue-100 px-4 py-2 flex items-center rounded-lg ml-10 text-primary"
                    : "ml-10 flex items-center"
                }
              >
                Quick Start
              </Link>
            </li>

            {/* REST API Overview - Nested under Overview */}
            <li>
              <Link
                href="/docs/overview/restApi"
                className={
                  pathname === "/docs/overview/restApi"
                    ? "bg-blue-100 px-4 py-2 flex items-center rounded-lg ml-10 text-primary"
                    : "ml-10 flex items-center"
                }
              >
                REST API Overview
              </Link>
            </li>

            {/* Example */}
            <li>
              <Link
                href="/docs/example"
                className={
                  pathname === "/docs/example"
                    ? "bg-blue-200 px-4 py-2 flex items-center rounded-lg text-primary"
                    : "flex items-center"
                }
              >
                <Image src={example} width={30} height={30} className="mr-4" />
                Example
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
