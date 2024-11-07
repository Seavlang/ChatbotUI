// src/components/ProjectList.js
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DeleteProjectModal from "./DeleteProjectModal";

const ProjectList = ({ projects }) => {
//   const [projectList, setProjectList] = useState(projects); // Client-side state for the project list
  
//   const handleProjectAdded = (newProject) => {
//     setProjectList((prevProjects) => [newProject, ...prevProjects]); // Update state immediately
//   };

//   const handleProjectDeleted = (deletedId) => {
//     setProjectList((prevProjects) => prevProjects.filter((project) => project.id !== deletedId));
//   };

  return (
    <div className="overflow-x-auto ml-10 mr-20 mt-10">
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
          {projects?.map((item) => (
            <tr key={item?.id} className="border-b border-gray-200">
              <td className="py-3 px-6">{item?.id}</td>
              <td className="py-3 px-6">
                <Link href={`/docs/allApps/${item?.project_name}`} className="text-blue-600 hover:underline">
                  {item?.project_name}
                </Link>
              </td>
              <td className="py-3 px-6">{item?.description || "No description"}</td>
              <td className="py-3 px-6">{item?.created_at}</td>
              <td className="py-3 px-6 text-right">
                <DeleteProjectModal projectId={item?.id}  />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
