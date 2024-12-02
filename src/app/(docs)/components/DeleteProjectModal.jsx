"use client";

import React, { useState } from "react";
import { deleteProjectAction } from "@/actions/docAction"; // Assuming this function exists
import Image from "next/image";
import toast from "react-hot-toast";

const DeleteProjectModal = ({ projectId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to close the modal
  const closeModal = () => {
    document.getElementById(`delete_modal_${projectId}`).close();
    setError(null); // Clear any error message
  };

  // Handle project deletion
  const handleDeleteProject = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await deleteProjectAction(projectId); // Directly use projectId
      if(res?.success == true) {
        toast.success(res.message);
      closeModal(); // Close the modal on success
      }
    } catch (error) {
      setError("Failed to delete project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        className="cursor-pointer font-bold py-2 px-4"
        onClick={() => {
          document.getElementById(`delete_modal_${projectId}`).showModal();
        }}
      >
        <Image
          src={"/asset/images/option.png"}
          width={3}
          height={3}
          alt="options"
        />
      </button>

      {/* Modal component */}
      <dialog id={`delete_modal_${projectId}`} className="modal">
        <div className="modal-box">
          {/* Modal Header */}
          <h2 className="text-lg text-left font-bold text-red-600 mb-4">Delete Project</h2>

          {/* Confirmation Text */}
          <p className="text-left text-gray-700 mb-4">
            Are you sure you want to delete this project? This action cannot be undone.
          </p>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
          <button
              className={`border text-primary py-2 px-4 rounded-lg ${
                loading ? "bg-gray-400 text-white cursor-not-allowed" : "border-primary"
              }`}
              onClick={closeModal}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              onClick={handleDeleteProject}
              disabled={loading} 
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteProjectModal;
