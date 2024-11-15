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
  session
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
  

  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval when the tab is not visible
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation(); // Restart the interval when the tab becomes visible
    }
  };

  useEffect(() => {

    const id = pathname.split('/').pop();
    const session = {
      sessionId: id
    }
    const fetchUser = async () =>{
      const result = await getCurrentUserAction();
      console.log("result : ",result)
      setUserId(result?.payload?.id);
    }
    const fetchSessionDetail = async () => {
      const sessionData = await getSessionDetailAction(session)
      setActiveSession(sessionData?.payload)
    }
    fetchUser()
    fetchSessionDetail();
  }, [])


  // useEffect(() => {
  //   startAnimation();
  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current);
  //     }
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, [placeholders]);



  // const draw = useCallback(() => {
  //   if (!inputRef.current) return;
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) return;

  //   canvas.width = 500;
  //   canvas.height = 500;
  //   ctx.clearRect(0, 0, 500, 500);
  //   const computedStyles = getComputedStyle(inputRef.current);

  //   const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
  //   ctx.font = `${fontSize}px light Poppin`;
  //   ctx.fillStyle = "#FFF";
  //   ctx.fillText(value, 16, 30);

  //   const imageData = ctx.getImageData(50, 50, 800, 800);
  //   const pixelData = imageData.data;
  //   const newData = [];

  //   for (let t = 0; t < 800; t++) {
  //     let i = 4 * t * 800;
  //     for (let n = 0; n < 800; n++) {
  //       let e = i + 4 * n;
  //       if (
  //         pixelData[e] !== 0 &&
  //         pixelData[e + 1] !== 0 &&
  //         pixelData[e + 2] !== 0
  //       ) {
  //         newData.push({
  //           x: n,
  //           y: t,
  //           color: [
  //             pixelData[e],
  //             pixelData[e + 1],
  //             pixelData[e + 2],
  //             pixelData[e + 3],
  //           ],
  //         });
  //       }
  //     }
  //   }

  //   newDataRef.current = newData.map(({ x, y, color }) => ({
  //     x,
  //     y,
  //     r: 1,
  //     color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
  //   }));
  // }, [value]);

  // useEffect(() => {
  //   draw();
  // }, [value, draw]);

  // const animate = (start) => {
  //   const animateFrame = (pos = 0) => {
  //     requestAnimationFrame(() => {
  //       const newArr = [];
  //       for (let i = 0; i < newDataRef.current.length; i++) {
  //         const current = newDataRef.current[i];
  //         if (current.x < pos) {
  //           newArr.push(current);
  //         } else {
  //           if (current.r <= 0) {
  //             current.r = 0;
  //             continue;
  //           }
  //           current.x += Math.random() > 0.5 ? 1 : -1;
  //           current.y += Math.random() > 0.5 ? 1 : -1;
  //           current.r -= 0.05 * Math.random();
  //           newArr.push(current);
  //         }
  //       }
  //       newDataRef.current = newArr;
  //       const ctx = canvasRef.current?.getContext("2d");
  //       if (ctx) {
  //         ctx.clearRect(pos, 0, 800, 800);
  //         newDataRef.current.forEach((t) => {
  //           const { x: n, y: i, r: s, color: color } = t;
  //           if (n > pos) {
  //             ctx.beginPath();
  //             ctx.rect(n, i, s, s);
  //             ctx.fillStyle = color;
  //             ctx.strokeStyle = color;
  //             ctx.stroke();
  //           }
  //         });
  //       }
  //       if (newDataRef.current.length > 0) {
  //         animateFrame(pos - 8);
  //       } else {
  //         setValue("");
  //         setAnimating(false);
  //       }
  //     });
  //   };
  //   animateFrame(start);
  // };

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
      socket.send(JSON.stringify(
        {
          "input": {
            "input": value,
            "user_id": userId,
            "session_id": activeSession?.id,
            "file_id": null
          }
        }
      ));
      onChange(value);
      setValue('');
      vanishAndSubmit();

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
