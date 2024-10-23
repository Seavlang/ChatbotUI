'use client'
import React from "react";

const CreateProjectModal = () => {
  // Function to close the modal
  const closeModal = () => {
    document.getElementById("my_modal_1").close(); // Close the dialog modal
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        New Project
      </button>

      {/* Modal component */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          {/* Modal Header */}
          <h2 className="text-lg text-left font-bold text-primary mb-4">Create Project</h2>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Project Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              onClick={closeModal} // Close the modal when clicked
            >
              Cancel
            </button>
            <button className=" text-primary py-2 px-4 border border-primary rounded-lg">
              Create
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CreateProjectModal;
