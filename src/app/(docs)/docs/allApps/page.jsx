'use server'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CreateProjectModal from "../../components/CreateProjectModal";
import { getAllProjectAction } from "@/actions/docAction";
import  Chatbot  from "@seavlang/hrdchatbotwidget/src/index";
import DeleteProjectModal from "../../components/DeleteProjectModal";

export default async function Page({ searchParams }) {
  const searchTerm = searchParams?.search || ""; // Get search term from query
  const data = await getAllProjectAction(); // Fetch all project data
  const tableData = data?.payload || [];

  // Filter projects on the server side based on the search term
  const filteredData = searchTerm
    ? tableData.filter((item) =>
        item.project_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tableData;

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="breadcrumbs mx-10 mt-10 mb-5 text-sm">
        <ul>
          <li>
            <Link href="/docs/allApps">App</Link>
          </li>
        </ul>
      </div>
      <h1 className="mx-10 mb-10 text-4xl font-medium text-primary">My Apps</h1>
      <Chatbot 
        SessionId="13" 
        projectId="8"  
        apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0X25hbWUiOiJzZWF2bGFuZyIsImVtYWlsIjoic2lldmxhbmd2ZXlAZ21haWwuY29tIn0.BYKAF4dQl34kppfrH_SS29ef4se5Qpr3cQ-1iNaolX0"
    />
      <div className="flex justify-between mr-20">
        <div className="w-1/5 ml-10">
          {/* Search form for server-side filtering */}
          <form method="get" action="/docs/allApps" className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="search"
              defaultValue={searchTerm}
              className="grow"
              placeholder="Search Project"
            />
            <button type="submit">
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
            </button>
          </form>
        </div>
        <div>
          <CreateProjectModal />
        </div>
      </div>
      {/* table */}
      <div className="overflow-x-auto ml-10 mr-20  mt-10">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead>
            <tr className="bg-primary text-white rounded-lg">
              <th className="py-3 px-6 text-left font-semibold">ID</th>
              <th className="py-3 px-6 text-left font-semibold">Project</th>
              <th className="py-3 px-6 text-left font-semibold">Description</th>
              <th className="py-3 px-6 text-left font-semibold">Created_at</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item?.id} className="border-b border-gray-200">
                <td className="py-3 px-6">{item?.id}</td>
                <td className="py-3 px-6">
                  <Link
                    href={`/docs/allApps/${item?.project_name}`}
                    className="text-blue-600 hover:underline"
                  >
                    {item?.project_name}
                  </Link>
                </td>
                <td className="py-3 px-6">
                  {item?.description ? item?.description : "No description"}
                </td>
                <td className="py-3 px-6">{item?.created_at}</td>
                <td className="py-3 px-6 text-right">
                  <DeleteProjectModal projectId={item?.id}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
