import Image from "next/image";
import Link from "next/link";
import React from "react";
import CreateProjectModal from "../../components/CreateProjectModal";
import { getAllProjectAction } from "@/actions/docAction";
import DeleteProjectModal from "../../components/DeleteProjectModal";

export default async function Page({ searchParams }) {
  const searchTerm = searchParams?.search || "";
  const data = await getAllProjectAction();
  const tableData = data?.payload || [];

  const filteredData = searchTerm
    ? tableData.filter((item) =>
        item.project_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tableData;

  return (
    <div className="w-full h-screen overflow-hidden bg-white dark:bg-gray-900 dark:text-gray-300">
      {/* Breadcrumbs */}
      <div className="breadcrumbs mx-10 mt-10 mb-5 text-sm text-gray-600 dark:text-gray-400">
        <ul>
          <li>
            <Link href="/docs/allApps" className="hover:underline">
              App
            </Link>
          </li>
        </ul>
      </div>
      <h1 className="mx-10 mb-10 text-4xl font-medium text-primary dark:text-white">
        My Apps
      </h1>

      {/* Search and Create */}
      <div className="flex justify-between">
        <div className="w-1/5 ml-10">
          {/* Search form for server-side filtering */}
          <form
            method="get"
            action="/docs/allApps"
            className="input input-bordered flex items-center gap-2 dark:bg-gray-800"
          >
            <input
              type="text"
              name="search"
              defaultValue={searchTerm}
              className="grow bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 "
              placeholder="Search Project"
            />
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 text-gray-600 dark:text-gray-400 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>
        <div>
          <CreateProjectModal />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto h-[65vh]  ml-10 mt-10">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
          <thead>
            <tr className="bg-primary text-white dark:bg-gray-700">
              <th className="py-3 px-6 text-left font-semibold rounded-s-xl">
                ID
              </th>
              <th className="py-3 px-6 text-left font-semibold">Project</th>
              <th className="py-3 px-6 text-left w-1/2 font-semibold">
                Description
              </th>
              <th className="py-3 px-6 text-left font-semibold">Created_at</th>
              <th className="py-3 px-6 rounded-r-xl"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={item?.id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">
                    <Link
                      href={`/docs/allApps/${item?.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {item?.project_name}
                    </Link>
                  </td>
                  <td className="py-3 px-6">
                    <span className="w-full block whitespace-nowrap overflow-hidden text-ellipsis">
                      {item?.description ? item?.description : "No description"}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    {new Date(item?.created_at).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="py-3 px-6 text-right">
                    <DeleteProjectModal projectId={item?.id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5} // Adjust this to match the number of columns in your table
                  className="py-6 px-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
