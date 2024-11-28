'use client'
import FileComponentPlayground from '@/app/components/FileComponentPlayground';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import Loading from '../playground/loading';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Choose your theme

export default function DefaultFileComponent({
  session,
  messages,
  files,
  handleSelectDocument,
  fetchOlderMessages,
  isLoadingMore,
  hasMoreMessages,
  isResponding,
  isFileUploading,
  setFiles, lmData
}) {
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [loadingOlderMessages, setLoadingOlderMessages] = useState(false); // Track loading of older messages
  const [isAddingNewMessages, setIsAddingNewMessages] = useState(false); // Track if new messages are being added

  // Scroll to the bottom of the container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };



  // Infinite scroll handler for older messages
  const handleInfiniteScroll = () => {
    const container = messagesContainerRef.current;
    if (container.scrollTop === 0 && hasMoreMessages && !isLoadingMore) {
      setLoadingOlderMessages(true); // Set flag when loading older messages
      fetchOlderMessages();
    }
  };

  // Show/Hide Scroll Down button on scroll
  const handleScroll = (e) => {
    const element = e.target;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - 10) {
      setShowScrollButton(false); // Hide button when at the bottom
    } else {
      setShowScrollButton(true); // Show button when user scrolls up
    }
  };

  // Attach scroll listener to the container
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      container.addEventListener("scroll", handleInfiniteScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener("scroll", handleInfiniteScroll);
      }
    };
  }, [hasMoreMessages, isLoadingMore]);

  // Preserve scroll position when fetching older messages
  useEffect(() => {
    const container = messagesContainerRef.current;

    if (loadingOlderMessages && container) {
      // Save current scroll height
      const previousScrollHeight = container.scrollHeight;

      // Adjust scroll position after fetching older messages
      const interval = setInterval(() => {
        if (!isLoadingMore) {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop = newScrollHeight - previousScrollHeight;

          setLoadingOlderMessages(false); // Reset flag
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [loadingOlderMessages, isLoadingMore]);

  // Automatically scroll to the bottom for new messages
  useEffect(() => {
    const container = messagesContainerRef.current;

    // Only scroll to bottom if new messages are added
    if (container && !isLoadingMore && isAddingNewMessages) {
      const timeout = setTimeout(() => {
        scrollToBottom();
      }, 100);

      setIsAddingNewMessages(false); // Reset flag after scrolling
      return () => clearTimeout(timeout);
    }
  }, [messages, isLoadingMore, isAddingNewMessages]);


  useEffect(() => {
    const container = messagesContainerRef.current;

    // Detect if new messages are added to the bottom
    if (messages?.length > 0) {
      const lastMessage = messages[messages.length - 1]; // Get the last message
      const isLastMessageNew = lastMessage?.role === "assistant" || lastMessage?.role === "user";

      if (isLastMessageNew && !loadingOlderMessages && container) {
        // Only scroll to bottom when the last message is new
        const timeout = setTimeout(() => {
          scrollToBottom();
        }, 100);

        return () => clearTimeout(timeout);
      }
    }
  }, [messages, loadingOlderMessages]);

  // Detect if new messages are added
  useEffect(() => {
    // Only set this flag if messages are added at the bottom
    setIsAddingNewMessages(true);
  }, [messages]);


  // Function to copy code to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(
      () => {
        console.log('Code copied to clipboard');
      },
      (err) => {
        console.error('Could not copy code: ', err);
      }
    );
  };

  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    console.log("code copied to clipboard: ", code)
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
      })
      .catch((err) => console.error('Failed to copy code:', err));
  };

  return (
    <div className="">
      <div className="flex">
        <div className="ml-5 inline-flex items-center border border-primary rounded-md px-3 py-2 text-md ">
          <span className="font-bold text-primary mr-2">{lmData?.provider_info?.model_name}</span>
          <span className="font-normal text-black">{lmData?.provider_info?.provider_name}</span>
        </div>
        <div>
          {files?.length > 0 ? (
            <div className="ml-5">
              <div className="relative w-full">
                <select
                  id="filesDropdown"
                  className="appearance-none w-full border border-primary rounded-md px-4 py-2 pr-10 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleSelectDocument(e.target.value)}
                >
                  {files.map((file) => (
                    <option key={file?.id} value={file?.id}>
                      {file?.file_name}
                    </option>
                  ))}
                </select>
                {/* Custom dropdown icon */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="inline-flex items-center border ml-5 border-gray-300 rounded-md px-3 py-2 text-md">
              <span className="font-medium text-primary ">No document</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex mx-auto w-full">
        {/* {
          isFileUploading ? <div className='flex justify-center bg-red-300'><Loading />llooaododod</div>
            : */}
        <div
          ref={messagesContainerRef}
          className="flex-grow overflow-y-auto mb-4 space-y-6 p-8 max-h-[610px] mt-5 messages-container">
          {isLoadingMore && <div className='flex justify-center'><Loading></Loading></div>}
          <div className='mx-96 '>
            {messages?.length > 0 ? (
              messages?.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message?.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`py-2 rounded-3xl break-words ${message?.role === "user"
                      ? "bg-[#90A1FE] px-5 max-w-2xl text-white my-5"
                      : message?.role === "error"
                        ? " text-red-500 px-5 max-w-3xl my-5 border border-red-500"
                        : "max-w-3xl"
                      }`}
                  >
                    <ReactMarkdown
                      // rehypePlugins={[rehypeRaw, rehypeHighlight]}
                      components={{
                        code: ({ node, inline, className = '', children, ...props }) => {
                          const language = className.replace('language-', '');
                          const code = String(children).replace(/\n$/, '');

                          if (!inline) {
                            const highlightedCode = language && hljs.getLanguage(language)
                              ? hljs.highlight(code, { language }).value
                              : code;

                            return (
                              <pre className={`code-block language-${language}`} {...props}>
                                <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                              </pre>
                            );
                          } else {
                            return (
                              <code className="inline-code" {...props}>
                                {children}
                              </code>
                            );
                          }
                        }
                        p: ({ node, children, ...props }) => (
                          <p
                            style={{
                              fontSize: '16px', // Adjust font size
                              fontWeight: 'medium',
                            }}
                            {...props}
                          >
                            {children}
                          </p>
                        ),
                        h1: ({ node, children, ...props }) => (
                          <h1
                            style={{
                              fontSize: '2rem', // Large and bold for main headings
                              fontWeight: 'bold',
                              lineHeight: '1.4',
                              marginBottom: '1em',
                              marginTop: '1em',
                            }}
                            {...props}
                          >
                            {children}
                          </h1>
                        ),
                        h2: ({ node, children, ...props }) => (
                          <h2
                            style={{
                              fontSize: '1.75rem', // Subheadings slightly smaller than h1
                              fontWeight: 'bold',
                              lineHeight: '1.5',
                              marginBottom: '0.8em',
                              marginTop: '0.8em',
                            }}
                            {...props}
                          >
                            {children}
                          </h2>
                        ),
                        h3: ({ node, children, ...props }) => (
                          <h3
                            style={{
                              fontSize: '1.5rem',
                              fontWeight: 'bold',
                              lineHeight: '1.5',
                              marginBottom: '0.8em',
                              marginTop: '0.8em',
                            }}
                            {...props}
                          >
                            {children}
                          </h3>
                        ),

                        strong: ({ node, children, ...props }) => (
                          <strong style={{ fontWeight: 'bold' }} {...props}>
                            {children}
                          </strong>
                        ),
                        em: ({ node, children, ...props }) => (
                          <em style={{ fontStyle: 'italic' }} {...props}>
                            {children}
                          </em>
                        ),

                      }}
                    >
                      {message?.content}
                    </ReactMarkdown>
                  </motion.div>
                </div>
              ))
            ) : (
              <div className="flex flex-row items-center justify-center mt-20 bg-yellow-200">
                <FileComponentPlayground session={session} isFileUploading={isFileUploading} setFiles={setFiles} />
              </div>
            )}
          </div>

          {/* This div is used as the reference to scroll to */}
          <div ref={messagesEndRef} />
        </div>
        {/* } */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-10 right-10 bg-[#deedff] text-primary px-4 py-2 rounded-full shadow-lg"
          >
            Scroll Down
          </button>
        )}
      </div>

    </div>
  );
}
