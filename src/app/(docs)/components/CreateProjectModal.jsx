"use client";

import React, { useState } from "react";
import {
  createProjectAction,
  createProjectSessionAction,
} from "@/actions/docAction";

const CreateProjectModal = ({ handleGetSessionId }) => {
  const [projectName, setProjectName] = useState(""); // State to track the project name
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const closeModal = () => {
    document.getElementById("my_modal_1").close();
    setProjectName("");
    setError(null);
  };

  const handleCreateProject = async () => {
    setLoading(true);
    setError(null);
    try {
      const create = await createProjectAction(projectName);
      console.log("create", create);
      if (create.success === true) {
        const session = await createProjectSessionAction(
          create.project_id.api_key
        );
        if (session.success === true) {
          console.log("sessionP", session);
          closeModal();
        }
      }
    } catch (error) {
      setError("Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        className="bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        New App
      </button>

      {/* Modal component */}
      <dialog
        id="my_modal_1"
        className="modal bg-white dark:bg-white dark:bg-opacity-5 text-black dark:text-gray-200"
      >
        <div className="modal-box bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          {/* Modal Header */}
          <h2 className="text-lg text-left font-bold text-primary dark:text-blue-400 mb-4">
            Create Project
          </h2>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)} // Update project name state
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-black dark:text-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
          />

          {/* Error Message */}
          {error && (
            <p className="text-red-500 dark:text-red-400 text-sm mb-4">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              className={`border text-primary dark:text-blue-400 py-2 px-4 rounded-lg ${
                loading
                  ? "bg-gray-400 dark:bg-gray-700 text-white cursor-not-allowed"
                  : "border-primary dark:border-blue-400"
              }`}
              onClick={closeModal}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className={`bg-primary dark:bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600`}
              onClick={handleCreateProject}
              disabled={loading || !projectName} // Disable button if loading or input is empty
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CreateProjectModal;
