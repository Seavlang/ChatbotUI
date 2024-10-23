'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CreateProjectModal from "../../components/CreateProjectModal";

export default function page() {
  const tableData = [
    {
      id: 1,
      project: "WePush",
      description: "Notification Provider",
      created_at: "2024-10-04",
    },
    {
      id: 2,
      project: "KSGAPush",
      description: "Notification Provider",
      created_at: "2024-10-04",
    },
    {
      id: 3,
      project: "HRDPush",
      description: "Notification Provider",
      created_at: "2024-10-04",
    },
    {
      id: 4,
      project: "KosignPush",
      description: "Notification Provider",
      created_at: "2024-10-04",
    },
  ];

  return (
    <div className="w-full h-screen overflow-hidden">
        <div className="breadcrumbs mx-10  mt-10 mb-5 text-sm">
          <ul>
            <li>
              <Link href="/docs/allApps">App</Link>
            </li>
          </ul>
      </div>
      <h1 className="mx-10 mb-10 text-4xl font-medium text-primary">My Apps</h1>

      <div className="flex justify-between mr-20">
        <div className="w-1/5 ml-10">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search Project" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div>
            <CreateProjectModal/>
        </div>
      </div>
      {/* table */}
      <div className="overflow-x-auto ml-10 mr-20 mt-10">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead>
            <tr className="bg-primary text-white rounded-lg">
              <th className="py-3 px-6 text-left font-semibold">ID</th>
              <th className="py-3 px-6 text-left font-semibold">Project</th>
              <th className="py-3 px-6 text-left font-semibold">Description</th>
              <th className="py-3 px-6 text-left font-semibold">Created_at</th>
              <th className="py-3 px-6"></th> {/* Placeholder for actions */}
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-3 px-6">{item.id}</td>
                <td className="py-3 px-6">
                  <Link
                    href={`/docs/allApps/${item.project}`}
                    className="text-blue-600 hover:underline"
                  >
                    {item.project}
                  </Link>
                </td>
                <td className="py-3 px-6">{item.description}</td>
                <td className="py-3 px-6">{item.created_at}</td>
                <td className="py-3 px-6 text-right">
                  <Image
                    src={"/asset/images/option.png"}
                    width={3}
                    height={3}
                    alt="options"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
