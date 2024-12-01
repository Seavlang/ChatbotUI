export const api_document = [
    {
        id: 1,
        title: 'Session Endpoint',
        description: 'Create Chat Session using POST session endpoint.',
        overview: 'This endpoint allows you to create a new chat session. A session ID is required to use other endpoints that rely on active sessions, such as document uploads or chat interactions. By creating a session first, you can link your interactions with documents and queries under a single session.',
        method: 'POST',
        path: 'http://110.74.194.123:1234/api/v1/api_generation/session/create_session',
        request: "curl -X 'POST' \
  'http://110.74.194.123:1234/api/v1/api_generation/session/create_session' \
  -H 'accept: application/json' \
  -d ''",
        code200: {
            message: "File uploaded successfully",
            success: true,
            payload: {
                session_id: "18b47375-d290-4cb9-948f-4eedd8a89631",
            },
        },
        code400: {
            detail: "400: Wrong file format."
        },
        responseBreakdown: "",
        useCase: '"This endpoint is essential for initializing a chat session within your system. By generating a session ID, you can manage your document interactions and chatbot conversations in an organized manner."'
    },
    {
        id: 2,
        title: 'Session Endpoint',
        description: 'Get all chat sessions using GET session endpoint.',
        overview: 'This endpoint allows you to retrieve all the session IDs associated with a specific project. Each session ID represents an individual chat session that has been created. You can use this information to view past interactions or manage ongoing sessions.',
        method: 'GET',
        path: 'https://chatbot.kshrd.com.kh/api/v1/chatbot/create_new_session',
        request: "curl -X 'GET' \
  'http://110.74.194.123:8085/api/v1/api_generation/session/get_all_sessions' \
  -H 'accept: application/json'",
        code200: {
            message: "File uploaded successfully",
            success: true,
            payload: {
                session_id: "18b47375-d290-4cb9-948f-4eedd8a89631",
            },
        },
        code400: {
            detail: "400: Wrong file format."
        },
        responseBreakdown: "",
        useCase: '"This endpoint is essential for initializing a chat session within your system. By generating a session ID, you can manage your document interactions and chatbot conversations in an organized manner."'
    },
    {
        id: 3,
        title: 'Session Endpoint',
        description: 'Get all chat sessions using GET session endpoint.',
        overview: 'This endpoint allows you to retrieve all the session IDs associated with a specific project. Each session ID represents an individual chat session that has been created. You can use this information to view past interactions or manage ongoing sessions.',
        method: 'DELETE',
        path: 'https://chatbot.kshrd.com.kh/api/v1/chatbot/create_new_session',
        request: "curl -X 'DELETE' \
  'http://110.74.194.123:8085/api/v1/api_generation/session/delete/222' \
  -H 'accept: application/json'",
        code200: {
            message: "File uploaded successfully",
            success: true,
            payload: {
                session_id: "18b47375-d290-4cb9-948f-4eedd8a89631",
            },
        },
        code400: {
            detail: "400: Wrong file format."
        },
        responseBreakdown: "",
        useCase: '"This endpoint is essential for initializing a chat session within your system. By generating a session ID, you can manage your document interactions and chatbot conversations in an organized manner."'
    },
    {
        id:4,
        title: 'Chat Endpoint',
        description: 'Upload documents using POST endpoint',
        overview: 'This endpoint allows you to retrieve all the session IDs associated with a specific project. Each session ID represents an individual chat session that has been created. You can use this information to view past interactions or manage ongoing sessions.',
        method: 'GET',
        path: 'https://chatbot.kshrd.com.kh/api/v1/chatbot/create_new_session',
        request: "curl -X 'POST' \\ \n  'http://localhost:8001/api/v1/chatbot/create_new_session' \\ \n    -H 'accept: application/json' \\ \n    -H 'Authorization: Bearer REST_API_KEY’",
        code200: {
            message: "File uploaded successfully",
            success: true,
            payload: {
                session_id: "18b47375-d290-4cb9-948f-4eedd8a89631",
            },
        },
        code400: {
            detail: "400: Wrong file format."
        },
        responseBreakdown: "",
        useCase: '"This endpoint is essential for initializing a chat session within your system. By generating a session ID, you can manage your document interactions and chatbot conversations in an organized manner."'
    },
    {
        id: 5,
        title: 'Session Endpoint',
        description: 'Get all chat sessions using GET session endpoint.',
        overview: 'This endpoint allows you to retrieve all the session IDs associated with a specific project. Each session ID represents an individual chat session that has been created. You can use this information to view past interactions or manage ongoing sessions.',
        method: 'GET',
        path: 'https://chatbot.kshrd.com.kh/api/v1/chatbot/create_new_session',
        request: "curl -X 'POST' \\ \n  'http://localhost:8001/api/v1/chatbot/create_new_session' \\ \n    -H 'accept: application/json' \\ \n    -H 'Authorization: Bearer REST_API_KEY’",
        code200: {
            message: "File uploaded successfully",
            success: true,
            payload: {
                session_id: "18b47375-d290-4cb9-948f-4eedd8a89631",
            },
        },
        code400: {
            detail: "400: Wrong file format."
        },
        responseBreakdown: "",
        useCase: '"This endpoint is essential for initializing a chat session within your system. By generating a session ID, you can manage your document interactions and chatbot conversations in an organized manner."'
    },
]