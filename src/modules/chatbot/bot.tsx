"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "hi",
      isUser: true,
      timestamp: "7/2/2025, 9:51:12 PM",
      timeAgo: "32m",
    },
    {
      id: 2,
      content:
        "Hello! How can I help you with your Gumroad account or products today?",
      isUser: false,
      timestamp: "7/2/2025, 9:51:13 PM",
      timeAgo: "32m",
    },
    {
      id: 3,
      content: "hi",
      isUser: true,
      timestamp: "7/2/2025, 9:55:59 PM",
      timeAgo: "27m",
    },
    {
      id: 4,
      content:
        "Hello! How can I help you with your Gumroad account or products today?",
      isUser: false,
      timestamp: "7/2/2025, 9:56:00 PM",
      timeAgo: "27m",
    },
    {
      id: 5,
      content: "dsdsdds",
      isUser: true,
      timestamp: "7/2/2025, 10:20:37 PM",
      timeAgo: "2m",
    },
    {
      id: 6,
      content:
        "It looks like your message might have been a typo. How can I assist you with Gumroad? If you have a question or need help, just let me know!",
      isUser: false,
      timestamp: "7/2/2025, 10:20:39 PM",
      timeAgo: "2m",
    },
    {
      id: 7,
      content: "dsdsd",
      isUser: true,
      timestamp: "7/2/2025, 10:20:44 PM",
      timeAgo: "2m",
    },
    {
      id: 8,
      content:
        "It seems like your message might be incomplete. If you have a question or need help with something on Gumroad, please let me know how I can assist you!",
      isUser: false,
      timestamp: "7/2/2025, 10:20:46 PM",
      timeAgo: "2m",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const now = new Date();
      const newMessage = {
        id: messages.length + 1,
        content: message,
        isUser: true,
        timestamp: now.toLocaleString(),
        timeAgo: "now",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Animation variants
  const chatVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.85,
      y: 20,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.85,
      y: 20,
      filter: "blur(10px)",
      transition: {
        duration: 0.2
      }
    }
  };

  const messageVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 25
      }
    }
  };

  const fabVariants = {
    rest: { 
      scale: 1,
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)"
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 6px 24px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 25
      }
    }
  };

  const iconVariants = {
    rest: { rotate: 0 },
    hover: { 
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const headerButtonVariants = {
    rest: { scale: 1, opacity: 0.7 },
    hover: { 
      scale: 1.1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 25
      }
    }
  };

  const supportButtonVariants = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.03,
      y: -1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: { 
      scale: 0.97,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 25
      }
    }
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          :root,
          .light,
          .dark {
            --sidebar-width: 280px;
            --sidebar-width-mobile: 100%;
            --sidebar-background: #ffffff;
            --sidebar-foreground: #000000;
            --sidebar-primary: #ffffff;
            --sidebar-primary-foreground: #000000;
            --sidebar-accent: color-mix(in srgb, #000000 20%, transparent);
            --sidebar-accent-foreground: #000000;
            --sidebar-border: color-mix(in srgb, #000000 20%, #ffffff);
            --sidebar-ring: color-mix(in srgb, #000000 50%, #ffffff);
            --background: #ffffff;
            --foreground: #000000;
            --card: #ffffff;
            --card-foreground: #000000;
            --popover: #ffffff;
            --popover-foreground: #000000;
            --primary: #000000;
            --primary-foreground: #ffffff;
            --secondary: color-mix(in srgb, #000000 20%, #ffffff);
            --secondary-foreground: #000000;
            --muted: color-mix(in srgb, #000000 10%, #ffffff);
            --muted-foreground: #000000;
            --accent: #000000;
            --accent-foreground: #ffffff;
            --border: color-mix(in srgb, #000000 20%, #ffffff);
            --input: color-mix(in srgb, #000000 20%, #ffffff);
            --ring: color-mix(in srgb, #000000 50%, #ffffff);
            --bright: #000000;
            --bright-foreground: #ffffff;
          }
          
          .support-widget {
            color-scheme: light;
          }
          
          .support-widget .text-primary {
            color: var(--primary);
          }
          
          .support-widget .bg-primary {
            background-color: var(--primary);
          }
          
          .support-widget .text-primary-foreground {
            color: var(--primary-foreground);
          }
          
          .support-widget .bg-background {
            background-color: var(--background);
          }
          
          .support-widget .text-foreground {
            color: var(--foreground);
          }
          
          .support-widget .border-black {
            border-color: #000000;
          }
          
          .support-widget .hover\\:text-muted-foreground:hover {
            color: var(--muted-foreground);
          }
          
          .support-widget .hover\\:bg-muted:hover {
            background-color: var(--muted);
          }
          
          .support-widget .text-gray-400 {
            color: #9ca3af;
          }
          
          .support-widget .border-green-500 {
            border-color: #10b981;
          }
          
          .support-widget .bg-green-100 {
            background-color: #dcfce7;
          }
          
          .support-widget .text-green-700 {
            color: #15803d;
          }
          
          .support-widget .text-green-600 {
            color: #16a34a;
          }
          
          .support-widget .border-gray-400 {
            border-color: #9ca3af;
          }
          
          .support-widget .hover\\:bg-gray-100:hover {
            background-color: #f3f4f6;
          }
          
          .support-widget .placeholder\\:text-muted-foreground::placeholder {
            color: var(--muted-foreground);
          }
          
          .support-widget .focus\\:border-transparent:focus {
            border-color: transparent;
          }
          
          .support-widget .focus\\:ring-muted-foreground:focus {
            --tw-ring-color: var(--muted-foreground);
          }
          
          .support-widget .focus\\:border-none:focus {
            border: none;
          }
          
          .support-widget .focus\\:outline-hidden:focus {
            outline: none;
          }
          
          .support-widget .focus\\:ring-0:focus {
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-ring-shadow: 0 0 #0000;
            box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
          }
          
          .support-widget .outline-hidden {
            outline: 2px solid transparent;
            outline-offset: 2px;
          }
          
          .support-widget .prose {
            color: var(--tw-prose-body);
            max-width: 65ch;
          }
          
          .support-widget .prose-sm {
            font-size: 0.875rem;
            line-height: 1.7142857;
          }
          
          .support-widget .prose p {
            margin-top: 1.1428571em;
            margin-bottom: 1.1428571em;
          }
          
          .support-widget .prose-sm p {
            margin-top: 1.1428571em;
            margin-bottom: 1.1428571em;
          }
          
          .support-widget .**\\:text-primary-foreground * {
            color: var(--primary-foreground);
          }
          
          .support-widget .**\\:text-foreground * {
            color: var(--foreground);
          }
          
          .support-widget .scrollbar-color {
            scrollbar-color: var(--scrollbar-color, rgba(0,0,0,0.4)) transparent;
          }
          
          .support-widget .scrollbar-webkit::-webkit-scrollbar {
            height: 4px;
          }
          
          .support-widget .scrollbar-webkit::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.4);
          }
        `,
        }}
      />

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="support-widget light flex h-screen w-full flex-col responsive-chat max-w-full sm:max-w-[720px] bg-gumroad-bg fixed bottom-20 right-6 z-50 bg-[#F4F4F0] border border-black shadow-2xl rounded-lg overflow-hidden"
            style={{ height: "600px", width: "400px" }}
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <motion.div 
              className="flex items-start justify-between border-b border-black p-1.5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="flex items-center h-full">
                <div className="ml-2 flex flex-col gap-0.5">
                  <h2 className="text-base leading-5 text-foreground">Support</h2>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  className="text-primary hover:text-muted-foreground p-1 rounded-full hover:bg-muted"
                  aria-label="Start new conversation"
                  data-state="closed"
                  variants={headerButtonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="6"
                      fill="currentColor"
                    ></rect>
                    <path
                      d="M8 12H16M12 8V16"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{ stroke: "var(--background)" }}
                    ></path>
                  </svg>
                </motion.button>
                <motion.button
                  className="text-primary hover:text-muted-foreground p-1 rounded-full hover:bg-muted"
                  aria-label="Show previous conversations"
                  data-state="closed"
                  variants={headerButtonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-history h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                    <path d="M12 7v5l4 2"></path>
                  </svg>
                </motion.button>
                
                <motion.button
                  className="text-primary hover:text-muted-foreground p-1 rounded-full hover:bg-muted"
                  aria-label="Close chat"
                  data-state="closed"
                  onClick={() => setIsOpen(false)}
                  variants={headerButtonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            <div className="relative flex-1 overflow-hidden">
              <div
                className="absolute inset-0 flex"
                style={{ transform: "translateX(-100%)" }}
              >
                <div className="shrink-0 w-full h-full">
                  <div className="h-full overflow-y-auto p-4"></div>
                </div>
                <div className="shrink-0 w-full h-full flex flex-col">
                  {/* Messages Container */}
                  <div
                    className="flex-1 overflow-y-auto p-4 
      [scrollbar-color:var(--scrollbar-color,rgba(0,0,0,0.4))_transparent] 
      [&::-webkit-scrollbar]:h-1 
      [&::-webkit-scrollbar-thumb]:bg-[rgba(0,0,0,0.4)] 
      dark:[&::-webkit-scrollbar-thumb]:bg-[rgba(0,0,0,0.4)] 
      dark:[--scrollbar-color:rgba(0,0,0,0.4)]"
                    id="message-container"
                  >
                    <div className="flex flex-col">   
                      {messages.map((msg, index) => (
                        <motion.div
                          key={msg.id}
                          className={`flex flex-col  ${
                            msg.isUser ? "ml-9 items-end" : "mr-9 items-start"
                          }`}
                          variants={messageVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: index * 0.05 }}
                        >
                          <div
                            className={`rounded-lg max-w-full ${
                              msg.isUser
                                ? "bg-primary text-primary-foreground"
                                : "border border-black bg-background text-foreground"
                            }`}
                          >
                            <div className="relative p-4">
                              <div
                                className={`text-sm ${
                                  msg.isUser
                                    ? "text-primary-foreground **:text-primary-foreground"
                                    : "text-foreground **:text-foreground"
                                }`}
                              >
                                <p>{msg.content}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-xs text-gray-400"
                              title={msg.timestamp}
                            >
                              <span title={msg.timestamp}>{msg.timeAgo}</span>
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Support Buttons */}
                  <motion.div
                    className="flex justify-center gap-4 py-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <motion.button 
                      className="flex items-center gap-2 rounded-full border border-green-500 bg-green-100 text-green-700 px-4 py-2 text-sm transition-colors duration-200"
                      variants={supportButtonVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <div
                        className="w-4 h-4 origin-bottom-left"
                        style={{ transform: "none" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-thumbs-up h-4 w-4 text-green-600"
                          aria-hidden="true"
                        >
                          <path d="M7 10v12"></path>
                          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path>
                        </svg>
                      </div>
                      That solved it!
                    </motion.button>
                    <motion.button 
                      className="flex items-center gap-2 rounded-full border border-gray-400 text-black px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                      variants={supportButtonVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <div
                        className="w-4 h-4 origin-center"
                        style={{ transform: "none" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-messages-square h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"></path>
                          <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                        </svg>
                      </div>
                      Talk to a human
                    </motion.button>
                  </motion.div>

                  {/* Chat Input */}
                  <motion.div 
                    className="border-t border-black p-4 bg-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex-1 flex items-start">
                        <textarea
                          className="w-full rounded-lg border-border text-sm focus:border-transparent focus:ring-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 self-stretch max-w-md placeholder:text-muted-foreground text-foreground flex-1 resize-none border-none bg-white p-0 pr-3 outline-hidden focus:border-none focus:outline-hidden focus:ring-0 min-h-[24px] max-h-[200px]"
                          aria-label="Ask a question"
                          placeholder="Ask a question..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={handleKeyDown}
                          style={{ height: "40px" }}
                        />
                        <div className="flex items-center gap-2">
                          <motion.button
                            type="button"
                            className="text-primary hover:text-muted-foreground p-2 rounded-full hover:bg-muted"
                            aria-label="Dictate"
                            data-state="closed"
                            variants={buttonVariants}
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-mic w-4 h-4 text-primary"
                              aria-hidden="true"
                            >
                              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                              <line x1="12" x2="12" y1="19" y2="22"></line>
                            </svg>
                          </motion.button>
                          <div className="relative">
                            <motion.div
                              variants={buttonVariants}
                              initial="rest"
                              whileHover="hover"
                              whileTap="tap"
                            >
                              <Button
                                onClick={handleSubmit}
                                aria-label="Send message"
                                className="relative z-10 hover:bg-[#FF90E8] flex h-8 w-8 items-center justify-center rounded-md bg-primary text-2xl text-primary-foreground transition-all duration-300 ease-in-out"
                                type="submit"
                                variant={"elevated"}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="none"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    d="M2.5 17.5L17.5 10L2.5 2.5V8.33333L13.3333 10L2.5 11.6667V17.5Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          className="p-3 rounded-full shadow-lg"
          style={{ backgroundColor: "#FB64B6" }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle support chat"
          variants={fabVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          <motion.svg
            className="hand-icon"
            width="26"
            height="29"
            viewBox="0 0 26 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            variants={iconVariants}
            initial="rest"
            animate="rest"
            whileHover="hover"
          >
            <path
              d="M16.9885 19.1603C14.4462 16.4526 25.36 8.80865 25.36 8.80865L22.5717 4.78239C22.5717 4.78239 18.2979 8.46521 15.1353 12.7541C14.4648 13.7215 13.1488 12.9234 13.9447 11.5515C15.9064 8.16995 21.5892 2.70127 21.5892 2.70127L17.2712 0.54569C17.2712 0.54569 14.458 3.38303 10.9133 10.5004C10.2651 11.8018 8.94659 11.1429 9.39493 9.80167C10.5422 6.36947 14.2637 0.913031 14.2637 0.913031L9.74091 0.17627C9.74091 0.17627 7.30141 4.59585 5.78539 10.0891C5.46118 11.2634 4.04931 10.9838 4.2171 9.81717C4.50759 7.79708 6.51921 1.95354 6.51921 1.95354L2.60762 1.97033C2.60762 1.97033 -0.737277 9.78607 1.7329 18.4073C3.13956 23.3167 7.54191 28.1763 13.287 28.1763C18.9209 28.1763 23.8513 23.8362 25.5294 17.1416L21.6221 14.1778C21.6221 14.1778 19.4441 21.7758 16.9885 19.1603Z"
              fill="#000000"
            />
          </motion.svg>
        </motion.button>
      </div>
    </>
  );
};

export default SupportWidget;