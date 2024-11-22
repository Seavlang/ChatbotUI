"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getSessionDetailAction } from "@/actions/sessionAction";
import { getSessionDetailService } from "@/services/session/session.service";
import { usePathname } from "next/navigation";
import { getCurrentUserAction } from "@/actions/userAction";

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  socket,
  selectedDocument
}) {

  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [activeSession, setActiveSession] = useState();
  const intervalRef = useRef(null);
  const canvasRef = useRef(null);
  const newDataRef = useRef([]);
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);
  const pathname = usePathname()
  const [userId, setUserId] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };

  useEffect(() => {

    const id = pathname.split('/').pop();
    const session = {
      sessionId: id
    }
    const fetchUser = async () => {
      const result = await getCurrentUserAction();
      console.log("result : ", result)
      setUserId(result?.payload?.id);
    }
    const fetchSessionDetail = async () => {
      const sessionData = await getSessionDetailAction(session)
      setActiveSession(sessionData?.payload)
    }
    fetchUser()
    fetchSessionDetail();
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !animating) {
      handleSubmit(e)
    }
  };

  // const vanishAndSubmit = () => {
  //   setAnimating(true);
  //   draw();

  //   const value = inputRef.current?.value || "";
  //   if (value && inputRef.current) {
  //     const maxX = newDataRef.current.reduce((prev, current) => (current.x > prev ? current.x : prev), 0);
  //     animate(maxX);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket && value) {
      console.log("file_id ",selectedDocument)
      const file_id = selectedDocument == 0 ? null : selectedDocument
      console.log("file_id ",file_id)
      socket.send(JSON.stringify(
        {
          "input": {
            "input": value,
            "user_id": userId,
            "session_id": activeSession?.id,
            "file_id": file_id
          }
        }
      ));
      onChange(value);
      setValue('');
      // vanishAndSubmit();

      //   // Resize to original size
      //   const textarea = inputRef.current;
      //   textarea.style.height = 'auto'; // Reset height to the initial size
    }
  }

  const adjustHeight = () => {
    const textarea = inputRef.current;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
  };
  const handleInputChange = (e) => {
    setValue(e.target.value);
    if (!animating) {
      setValue(e.target.value);
      adjustHeight(); // Adjust height on each change
    }
  };

  return (
    (
      <div className="relative w-full max-w-3xl dark:bg-zinc-800 rounded-3xl shadow-[0px_10px_25px_rgba(0,0,0,0.2)] transition duration-200"> {/* Container with relative positioning */}

        <form
          className={cn(
            "w-full "
          )}
          onSubmit={handleSubmit}
        >
          {/* Canvas with optional absolute positioning */}
          <canvas
            className={cn(
              "pointer-events-none text-lg font-medium left-2 sm:left-8 filter invert dark:invert-0 overflow-hidden",
              animating ? "opacity-100" : "opacity-0"
            )}
            style={{ position: 'absolute', top: '20%', zIndex: 1 }} // Ensuring it doesn't interfere with the textarea
            ref={canvasRef}
          />

          {/* Expanding Textarea */}
          <textarea
            ref={inputRef}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={value}
            type="text"
            className={
              cn(
                "w-full p-3 text-lg font-normal px-4 rounded-lg resize-none z-50 border-none bg-transparent text-black top-4 focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20 ",
                animating && "text-transparent dark:text-transparent"
              )
            }
            rows={1} // Start with a single row
            style={{ outline: "none", maxHeight: "200px", overflowY: "auto" }} // Ensure textarea is on top
          />

          <button
            disabled={!value}
            type="submit"
            className="absolute right-5 bottom-3 z-50  h-8 w-8 rounded-full bg-[#deedff] bg-opacity-70 dark:bg-[#004B93] transition duration-200 flex items-center justify-center">

            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary h-4 w-4">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <motion.path
                d="M5 12l14 0"
                initial={{
                  strokeDasharray: "50%",
                  strokeDashoffset: "50%",
                }}
                animate={{
                  strokeDashoffset: value ? 0 : "50%",
                }}
                transition={{
                  duration: 0.3,
                  ease: "linear",
                }} />
              <path d="M13 18l6 -6" />
              <path d="M13 6l6 6" />
            </motion.svg>


          </button>
          <div
            className="absolute inset-0 flex items-end bottom-4 rounded-full pointer-events-none">
            <AnimatePresence mode="wait">
              {!value && (
                <motion.p
                  initial={{
                    y: 5,
                    opacity: 0,
                  }}
                  key={`current-placeholder-${currentPlaceholder}`}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    y: -15,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "linear",
                  }}
                  className="dark:text-zinc-500 text-lg font-[450] text-neutral-600 pl-7 sm:pl-10 text-left w-[calc(100%-2rem)] truncate">
                  {placeholders[currentPlaceholder]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

        </form>
      </div>
    )
  );
}
