import React, { useState, useEffect, useRef } from "react";
import { getAllSessionAction } from "@/actions/docAction";

function TestComponent({ projectId, apiKey }) {
  const [input, setInput] = useState("");
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState("");
  const wsRef = useRef(null);

  // Fetch session data on component mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getAllSessionAction(apiKey);
        setSession(sessionData);
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchSession();
  }, [apiKey]);

  const earliestSession = session?.payload?.reduce((prev, current) =>
    new Date(prev.created_at) < new Date(current.created_at) ? prev : current
  );

  
  useEffect(() => {
    wsRef.current = new WebSocket("ws://110.74.194.123:1234/ws/generate-response");

    wsRef.current.onopen = () => {
      console.log("WebSocket connection established.");
    };

    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "error") {
          setOutput(`Error: ${data.content}`);
        } else if (data.type === "paragraph" && data.content?.trim()) {
          setOutput((prevOutput) => prevOutput + " " + data.content.trim()); 
        } else {
          console.warn("Unexpected or empty content received:", data);
        }
      } catch (error) {
        console.error("Error parsing WebSocket response:", error);
        setOutput("Error parsing server response.");
      }
      setIsLoading(false); 
    }

    wsRef.current.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      wsRef.current?.close();
    };
  }, []);

  const handleSend = () => {
    if (input.trim() === "") return;

    setIsLoading(true);
    setOutput(""); 

    const payload = {
      input: {
        input, 
        external_session_id: earliestSession?.id, 
        project_id: projectId, 
      },
    };

    wsRef.current?.send(JSON.stringify(payload));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="dark:text-gray-200">
      <div className="text-sm font-medium">Inputs</div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Send a message"
        className="flex-1 w-[85%] mr-5 focus:outline-none border-2 dark:border-gray-700 my-5 py-3 px-5 rounded-xl text-sm font-normal focus:ring-none bg-white dark:bg-gray-800 text-black dark:text-gray-200"
        disabled={isLoading} // Disable input box during loading
      />
      <button
        className="w-[12%] bg-primary text-white rounded-lg text-sm py-3 cursor-pointer"
        onClick={handleSend}
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>

      <div className="text-sm font-medium">Output</div>
      <div className="w-full my-5 h-auto max-h-80 overflow-y-auto text-sm font-normal rounded-xl border py-3 px-5 bg-white dark:bg-gray-800 dark:border-gray-700 text-black dark:text-gray-200">
        {output ? <p className="text-gray-800 dark:text-gray-300">{output}</p> : <p>No response yet.</p>}
      </div>
    </div>
  );
}

export default TestComponent;
