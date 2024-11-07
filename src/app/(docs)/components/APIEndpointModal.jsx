
import React, { useRef } from 'react'
import { CopyBlock, ocean } from "react-code-blocks";

function APIEndpointModal() {
    const dialogRef = useRef(null);

    const closeModal = () => {
        dialogRef.current.close();
    };
    const codeString = "curl -X 'POST' \\ \n  'http://localhost:8001/api/v1/chatbot/create_new_session' \\ \n    -H 'accept: application/json' \\ \n    -H 'Authorization: Bearer REST_API_KEY’"

    const json201Response = {
        message: "File uploaded successfully",
        success: true,
        payload: {
            session_id: "18b47375-d290-4cb9-948f-4eedd8a89631",
        },
    };

    const errorResponse = {
        detail: "400: Wrong file format."
    }

    const useCase = "This endpoint is essential for initializing a chat session within your system. By generating a session ID, you can manage your document interactions and chatbot conversations in an organized manner."
    return (
        <dialog id="my_modal_1" ref={dialogRef} className="modal">

            <div className="modal-box max-w-[770px] max-h-[700px] rounded-lg overflow-y-auto  outline-none ">
                <button className='absolute right-0' onClick={closeModal}>
                    <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.4141 30.025C16.7693 30.025 15.1406 29.701 13.621 29.0716C12.1013 28.4422 10.7206 27.5196 9.55755 26.3565C8.3945 25.1935 7.47191 23.8127 6.84247 22.2931C6.21303 20.7735 5.88906 19.1448 5.88906 17.5C5.88906 15.8552 6.21303 14.2265 6.84247 12.7069C7.47191 11.1873 8.3945 9.80654 9.55755 8.64349C10.7206 7.48043 12.1014 6.55785 13.621 5.92841C15.1406 5.29897 16.7693 4.975 18.4141 4.975C20.0589 4.975 21.6876 5.29897 23.2072 5.92841C24.7268 6.55785 26.1075 7.48044 27.2706 8.64349C28.4336 9.80654 29.3562 11.1873 29.9857 12.7069C30.6151 14.2265 30.9391 15.8552 30.9391 17.5C30.9391 19.1448 30.6151 20.7735 29.9857 22.2931C29.3562 23.8127 28.4336 25.1935 27.2706 26.3565C26.1075 27.5196 24.7268 28.4422 23.2072 29.0716C21.6876 29.701 20.0589 30.025 18.4141 30.025L18.4141 30.025Z" stroke="#7E869E" strokeOpacity="0.25" strokeWidth="1.2" />
                        <path d="M14.0391 13.125L22.7891 21.875" stroke="#222222" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M22.7891 13.125L14.0391 21.875" stroke="#222222" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>

                </button>
                {/* Modal Header */}
                <div className=' mx-10 mt-5 border-b-[0.3px] border-black border-opacity-30  h-[100px]'>
                    <div className="text-3xl text-left font-medium text-primary mb-4">Session Endpoint</div>
                    <div className='text-md font-normal'>Create Chat Session using POST session endpoint.</div>
                </div>

                {/* Modal Body */}
                <div className=' mx-10 my-5 '>
                    {/* Introduction */}
                    <div>
                        <div className='text-base my-5 font-semibold'>Overview</div>
                        <div className='text-base font-normal'>This endpoint allows you to create a new chat session. A session ID is required to use other endpoints that rely on active sessions, such as document uploads or chat interactions. By creating a session first, you can link your interactions with documents and queries under a single session.</div>
                    </div>

                    {/* Example */}
                    <div>
                        <div className='text-base my-5 font-semibold'>Example</div>
                        {/* endpoint */}
                        <div className='my-5 flex'>
                            <div className='bg-[#72BF4D] text-white w-14 h-6 rounded-md flex justify-center items-center'>POST</div>
                            <div className='ml-2 text-[#878787]'>https://chatbot.kshrd.com.kh/api/v1/chatbot/create_new_session</div>
                        </div>
                        <div className="bg-[#004655] rounded-lg ">
                            {/* Title Section */}
                            <div className="rounded-t-lg  text-white border-b-[1px] border-white px-4 py-2 flex justify-between items-center">
                                <span className="font-semibold">REQUEST</span>
                                {/* Copy Button (optional for style, not functional here) */}
                                <button className="text-gray-400 hover:text-white">📋</button>
                            </div>

                            <div className="mx-4 py-4">
                                {/* Code Block */}
                                <CopyBlock
                                    text={codeString}
                                    language="bash"
                                    showLineNumbers={false}
                                    theme={{
                                        ...ocean,
                                        backgroundColor: "#004655", // Adjusted background color
                                        color: "#d1e8ff",
                                    }}
                                />
                            </div>

                        </div>

                        {/* Response sample */}
                        <div className='text-base my-5 font-semibold'>Response Sample</div>
                        {/* 201 */}
                        <div className='mb-5'>
                            <div className='mb-5 text-[#878787]'>
                                <span className='text-sm mr-5 my-5 font-bold'>Code</span>
                                <span className='text-sm my-5 font-normal'>201</span>
                            </div>

                            <div className="bg-[#FFF0F0] rounded-lg overflow-hidden">
                                {/* Title Section */}
                                <div className="bg-[#FFF0F0] text-[#969696] border-b-[1px] border-white px-4 py-2 flex justify-between items-center">
                                    <span className="font-semibold">Response Body</span>
                                    {/* Copy Button (optional for style, not functional here) */}
                                    <button className="text-gray-400 hover:text-white">📋</button>
                                </div>
                                <pre className='mx-5 my-4'>
                                    <code className='text-primary'>
                                        {JSON.stringify(json201Response, null, 2)}
                                    </code>
                                </pre>

                            </div>
                        </div>

                        {/* 404 */}
                        <div className='mb-5'>
                            <div className='mb-5 text-[#878787]'>
                                <span className='text-sm mr-5 my-5 font-bold'>Code</span>
                                <span className='text-sm my-5 font-normal'>404</span>
                            </div>

                            <div className="bg-[#FFF0F0] rounded-lg overflow-hidden">
                                {/* Title Section */}
                                <div className="bg-[#FFF0F0] text-[#969696] border-b-[1px] border-white px-4 py-2 flex justify-between items-center">
                                    <span className="font-semibold">Response Body</span>
                                    {/* Copy Button (optional for style, not functional here) */}
                                    <button className="text-gray-400 hover:text-white">📋</button>
                                </div>
                                <pre className='mx-5 my-4'>
                                    <code className='text-primary'>
                                        {JSON.stringify(errorResponse, null, 2)}
                                    </code>
                                </pre>

                            </div>
                        </div>

                        {/* Response breakdown */}
                        <div className='text-base my-5 font-semibold'>Response Breakdown</div>
                        <div>
                            <div className='mb-5 ml-5'>
                                <span className='font-medium '>200 Success Response:</span>
                                <ul className='list-disc list-inside ml-5'>
                                    <li>message: Indicates that the chat session has been successfully created.</li>
                                    <li>success: Boolean value confirming the success of the operation.</li>
                                    <li>session_id: Unique identifier for the newly created chat session.</li>
                                </ul>
                            </div>
                            <div className='mb-5 ml-5'>
                                <span className='font-medium'>400 Error Response:</span>
                                <ul className='list-disc list-inside ml-5'>
                                    <li>detail: Provides information about the error, such as an invalid request format or missing parameters.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Use Case */}
                        <div className='text-base my-5 font-semibold'>Use Case</div>
                        <div>{useCase}</div>

                    </div>
                </div>

            </div>
        </dialog>
    )
}

export default APIEndpointModal