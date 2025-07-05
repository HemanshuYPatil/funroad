"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Load messages and history from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("supportWidgetMessages");
    const savedHistory = localStorage.getItem("supportWidgetHistory");

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save messages and history to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("supportWidgetMessages", JSON.stringify(messages));

    // Update history with the latest conversation
    if (messages.length > 0) {
      const lastUserMessage = messages.filter((msg) => msg.isUser).pop();
      if (lastUserMessage) {
        const newHistoryItem = {
          id: lastUserMessage.id,
          preview:
            lastUserMessage.content.length > 20
              ? lastUserMessage.content.substring(0, 20) + "..."
              : lastUserMessage.content,
          timeAgo: lastUserMessage.timeAgo,
          messages: messages, // Store all messages for this conversation
        };

        setHistory((prev) => {
          const existingIndex = prev.findIndex(
            (item) => item.id === lastUserMessage.id
          );
          let newHistory = [...prev];

          if (existingIndex >= 0) {
            newHistory[existingIndex] = newHistoryItem;
          } else {
            newHistory = [newHistoryItem, ...prev].slice(0, 50); // Keep last 50 conversations
          }

          localStorage.setItem(
            "supportWidgetHistory",
            JSON.stringify(newHistory)
          );
          return newHistory;
        });
      }
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        messagesContainerRef.current;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) > 100;
      setShowScrollButton(isNearBottom);
    }
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      content: message,
      isUser: true,
      timestamp: new Date().toLocaleString(),
      timeAgo: "now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      // Call OpenRouter API
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
            "HTTP-Referer": window.location.href,
            "X-Title": "Gumroad Support",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-chat-v3-0324:free",
            messages: [
              ...messages
                .filter((msg) => !msg.isUser || msg.id === userMessage.id)
                .map((msg) => ({
                  role: msg.isUser ? "user" : "assistant",
                  content: msg.content,
                })),
            ],
          }),
        }
      );

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      const botMessage = data.choices[0].message.content;

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          content: botMessage,
          isUser: false,
          timestamp: new Date().toLocaleString(),
          timeAgo: "now",
        },
      ]);
    } catch (error) {
      console.error("Error calling OpenRouter API:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          content:
            "Sorry, I'm having trouble connecting to the support service. Please try again later.",
          isUser: false,
          timestamp: new Date().toLocaleString(),
          timeAgo: "now",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const loadConversation = (conversationId) => {
    const conversation = history.find((item) => item.id === conversationId);
    if (conversation) {
      setMessages(conversation.messages);
      setActiveTab("chat");
    }
  };

  const startNewConversation = () => {
    setActiveTab("chat");
  };

  // Animation variants (same as before)
  const chatVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      y: 20,
      filter: "blur(10px)",
      transition: { duration: 0.2 },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 25, mass: 0.5 },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
    tap: {
      scale: 0.98,
      transition: { type: "spring", stiffness: 600, damping: 25 },
    },
  };

  const fabVariants = {
    rest: { scale: 1, boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)" },
    hover: {
      scale: 1.05,
      boxShadow: "0 6px 24px rgba(0, 0, 0, 0.2)",
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
    tap: {
      scale: 0.95,
      transition: { type: "spring", stiffness: 600, damping: 25 },
    },
  };

  const iconVariants = {
    rest: { rotate: 0 },
    hover: {
      rotate: 5,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
  };

  const headerButtonVariants = {
    rest: { scale: 1, opacity: 0.7 },
    hover: {
      scale: 1.1,
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
    tap: {
      scale: 0.95,
      transition: { type: "spring", stiffness: 600, damping: 25 },
    },
  };

  const supportButtonVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.03,
      y: -1,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
    tap: {
      scale: 0.97,
      y: 0,
      transition: { type: "spring", stiffness: 600, damping: 25 },
    },
  };

  const scrollButtonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          :root, .light, .dark {
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
          
          .history-item {
            padding: 12px 16px;
            border-bottom: 1px solid #e5e7eb;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .history-item:hover {
            background-color: #f3f4f6;
          }
          .history-preview {
            font-weight: 500;
            margin-bottom: 2px;
          }
          .history-time {
            color: #6b7280;
            font-size: 0.75rem;
          }
          .tab-button {
            padding: 8px 16px;
            border: none;
            background: none;
            cursor: pointer;
            position: relative;
          }
          .tab-button.active {
            font-weight: 600;
          }
          .tab-button.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            right: 0;
            height: 2px;
            background-color: #000;
          }
          .typing-indicator {
            display: flex;
            padding: 8px 16px;
          }
          .typing-indicator span {
            height: 8px;
            width: 8px;
            margin: 0 2px;
            background-color: #9ca3af;
            border-radius: 50%;
            display: inline-block;
            animation: typing 1s infinite ease-in-out;
          }
          .typing-indicator span:nth-child(1) {
            animation-delay: 0s;
          }
          .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
          }
          .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
          }
          @keyframes typing {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
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
                  <h2 className="text-base leading-5 text-foreground">
                    Support
                  </h2>
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
                  onClick={startNewConversation}
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

            {/* Tabs */}
            <div className="flex border-b border-black">
              <button
                className={`tab-button flex-1 text-center ${activeTab === "chat" ? "active" : ""}`}
                onClick={() => setActiveTab("chat")}
              >
                Chat
              </button>
              <button
                className={`tab-button flex-1 text-center ${activeTab === "history" ? "active" : ""}`}
                onClick={() => setActiveTab("history")}
              >
                History
              </button>
            </div>

            <div className="relative flex-1 overflow-hidden">
              <div
                className="absolute inset-0 flex"
                style={{ transform: "translateX(-100%)" }}
              >
                <div className="shrink-0 w-full h-full">
                  <div className="h-full overflow-y-auto p-4"></div>
                </div>
                <div className="shrink-0 w-full h-full flex flex-col">
                  {/* History Tab Content */}
                  {activeTab === "history" && (
                    <div className="flex-1 overflow-y-auto">
                      {history.map((item) => (
                        <div
                          key={item.id}
                          className="history-item"
                          onClick={() => loadConversation(item.id)}
                        >
                          <div className="history-preview">{item.preview}</div>
                          <div className="history-time">{item.timeAgo}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Chat Tab Content */}
                  {activeTab === "chat" && (
                    <>
                      {/* Messages Container */}
                      <div
                        ref={messagesContainerRef}
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
                                msg.isUser
                                  ? "ml-9 items-end"
                                  : "mr-9 items-start"
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
                                  <span title={msg.timestamp}>
                                    {msg.timeAgo}
                                  </span>
                                </span>
                              </div>
                            </motion.div>
                          ))}
                          {isLoading && (
                            <motion.div
                              className="flex flex-col mr-9 items-start"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <div className="rounded-lg max-w-full border border-black bg-background text-foreground">
                                <div className="relative p-4">
                                  <div className="text-sm text-foreground **:text-foreground">
                                    <div className="typing-indicator">
                                      <span></span>
                                      <span></span>
                                      <span></span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                          <div ref={messagesEndRef} />
                        </div>
                      </div>

                      {/* Scroll to bottom button */}
                      <AnimatePresence>
                        {showScrollButton && (
                          <motion.button
                            className="absolute bottom-24 right-6 z-10 p-2 rounded-full bg-black text-white shadow-md"
                            onClick={scrollToBottom}
                            variants={scrollButtonVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            whileHover="hover"
                            whileTap="tap"
                            aria-label="Scroll to bottom"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-chevron-down"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </motion.button>
                        )}
                      </AnimatePresence>

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
                              disabled={isLoading}
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
                                disabled={isLoading}
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
                                    className="relative z-10  flex h-8 w-8 items-center justify-center rounded-md bg-primary hover:bg-[#FF90E8] text-2xl text-primary-foreground transition-all duration-300 ease-in-out"
                                    type="submit"
                                    variant={"elevated"}
                                    disabled={isLoading || !message.trim()}
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
                                      className="lucide lucide-send h-3.5 w-3.5 -rotate-90"
                                      aria-hidden="true"
                                      data-sentry-element="Send"
                                      data-sentry-source-file="ShadowHoverButton.tsx"
                                    >
                                      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                                      <path d="m21.854 2.147-10.94 10.939" />
                                    </svg>
                                  </Button>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
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
