// import React, { useState, useRef, useEffect } from 'react';
// import { Send, RefreshCw, X, ChevronDown, Sparkles, MessageCircle } from 'lucide-react';

// const ChatBot = () => {
//     const [messages, setMessages] = useState([
//         { id: 1, text: "Hi there! I'm your AI assistant. How can I help you today?", sender: "bot", isTyping: false }
//     ]);
//     const [inputValue, setInputValue] = useState("");
//     const [isTyping, setIsTyping] = useState(false);
//     const [isExpanded, setIsExpanded] = useState(true);
//     const [isChatOpen, setIsChatOpen] = useState(false);
//     const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
//     const messagesEndRef = useRef(null);
//     const inputRef = useRef(null);
//     const chatContainerRef = useRef(null);

//     // Handle window resize
//     useEffect(() => {
//         const handleResize = () => {
//             setWindowWidth(window.innerWidth);
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     // Determine chat size based on screen width
//     const getChatSize = () => {
//         if (windowWidth < 640) { // Mobile
//             return {
//                 width: 'w-full',
//                 height: 'h-[80vh]',
//                 position: 'bottom-0 right-0 left-0',
//                 rounded: 'rounded-t-2xl rounded-b-none'
//             };
//         } else if (windowWidth < 768) { // Small tablet
//             return {
//                 width: isExpanded ? 'w-[90vw]' : 'w-64',
//                 height: 'h-[500px]',
//                 position: 'bottom-4 right-4',
//                 rounded: 'rounded-2xl'
//             };
//         } else { // Desktop and large tablets
//             return {
//                 width: isExpanded ? 'w-96' : 'w-72',
//                 height: 'h-[500px]',
//                 position: 'bottom-4 right-4',
//                 rounded: 'rounded-2xl'
//             };
//         }
//     };

//     const chatSize = getChatSize();

//     const handleInputChange = (e) => {
//         setInputValue(e.target.value);
//     };

//     const handleSendMessage = () => {
//         if (inputValue.trim() === "") return;

//         // Add user message with animation class
//         const userMessageId = Date.now();
//         setMessages(prev => [...prev, { id: userMessageId, text: inputValue, sender: "user", new: true }]);
//         setInputValue("");

//         // Focus input after sending
//         setTimeout(() => {
//             inputRef.current?.focus();
//         }, 100);

//         // Simulate bot typing
//         setIsTyping(true);

//         // Simulate bot response after a delay
//         setTimeout(() => {
//             setIsTyping(false);
//             const responses = [
//                 "That's fascinating! I'd love to explore that idea more.",
//                 "Great question! Here's what I think about that...",
//                 "I understand exactly what you mean. Let me help with that.",
//                 "That's an excellent point! Let me provide some insights.",
//                 "I see what you're asking. Here's a helpful perspective..."
//             ];
//             const randomResponse = responses[Math.floor(Math.random() * responses.length)];
//             setMessages(prev => [...prev, { id: Date.now(), text: randomResponse, sender: "bot", new: true }]);
//         }, 1500);
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter') {
//             handleSendMessage();
//         }
//     };

//     const resetSession = () => {
//         // Add a fade-out animation to all messages
//         setMessages(prev => prev.map(msg => ({ ...msg, removing: true })));

//         // After animation completes, reset messages
//         setTimeout(() => {
//             setMessages([
//                 { id: Date.now(), text: "Chat reset! How can I help you today?", sender: "bot", new: true }
//             ]);
//         }, 500);
//     };

//     const toggleChat = () => {
//         setIsChatOpen(!isChatOpen);
//         if (!isChatOpen) {
//             // When opening chat, scroll to bottom after animation completes
//             setTimeout(() => {
//                 messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//             }, 500);
//         }
//     };

//     const toggleExpand = () => {
//         setIsExpanded(!isExpanded);
//     };

//     // Auto-scroll to bottom when messages change
//     useEffect(() => {
//         if (isChatOpen) {
//             messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//         }

//         // Remove "new" flag after animation completes
//         const timer = setTimeout(() => {
//             setMessages(prev => prev.map(msg => ({ ...msg, new: false })));
//         }, 700);

//         return () => clearTimeout(timer);
//     }, [messages, isChatOpen]);

//     // Get appropriate bottom position for chat button based on screen size
//     const getChatButtonPosition = () => {
//         if (windowWidth < 640) {
//             return 'bottom-6';
//         }
//         return 'bottom-4';
//     };

//     return (
//         <div className={`fixed z-50 ${getChatButtonPosition()} right-4 md:right-4`}>
//             {/* Main chat container - shown when open */}
//             {isChatOpen && (
//                 <div
//                     ref={chatContainerRef}
//                     className={`flex flex-col ${chatSize.width} ${chatSize.height} ${windowWidth < 640 ? '' : 'mb-4'} transition-all duration-500 ease-in-out animate-slide-in fixed ${chatSize.position}`}
//                 >
//                     {/* Animated gradient border wrapper */}
//                     <div className={`absolute inset-0 ${chatSize.rounded} p-[2px] bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 animate-gradient-x`}>
//                         <div className={`absolute inset-0 ${chatSize.rounded} bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 opacity-30 blur-md animate-pulse`}></div>

//                         {/* Main chat container */}
//                         <div className={`relative h-full w-full bg-gray-900 ${chatSize.rounded} overflow-hidden flex flex-col shadow-2xl`}>
//                             {/* Header with animations */}
//                             <div className="bg-gray-800 px-4 py-3 flex justify-between items-center border-b border-gray-700">
//                                 <div className="flex items-center space-x-2">
//                                     <div className="relative">
//                                         <div className="h-3 w-3 bg-teal-500 rounded-full"></div>
//                                         <div className="absolute inset-0 bg-teal-500 rounded-full animate-ping opacity-75"></div>
//                                     </div>
//                                     <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-bold text-lg">AquaChat AI</h1>
//                                     <Sparkles size={16} className="text-teal-400 animate-pulse" />
//                                 </div>

//                                 <div className="flex items-center space-x-1">
//                                     {windowWidth >= 640 && (
//                                         <button
//                                             onClick={toggleExpand}
//                                             className="text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-full p-1.5 transition-colors duration-200"
//                                             aria-label="Toggle size"
//                                         >
//                                             <ChevronDown size={14} className={`transform transition-transform duration-300 ${isExpanded ? '' : 'rotate-180'}`} />
//                                         </button>
//                                     )}
//                                     <button
//                                         onClick={resetSession}
//                                         className="text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-full p-1.5 transition-colors duration-200"
//                                         aria-label="Reset chat"
//                                     >
//                                         <RefreshCw size={14} className="hover:rotate-180 transition-transform duration-500" />
//                                     </button>
//                                     <button
//                                         onClick={toggleChat}
//                                         className="text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-full p-1.5 transition-colors duration-200"
//                                         aria-label="Close chat"
//                                     >
//                                         <X size={14} />
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Messages container with animated background */}
//                             <div
//                                 className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
//                                 style={{
//                                     backgroundImage: `
//                     radial-gradient(circle at 20% 30%, rgba(13, 148, 136, 0.15) 0%, transparent 50%), 
//                     radial-gradient(circle at 80% 70%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)
//                   `
//                                 }}
//                             >
//                                 {messages.map((message) => (
//                                     <div
//                                         key={message.id}
//                                         className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} ${message.removing ? 'animate-fade-out' : ''}`}
//                                     >
//                                         <div
//                                             className={`max-w-[75%] sm:max-w-xs p-3 ${message.new ? 'animate-message-in' : ''} ${message.sender === "user"
//                                                 ? "bg-gradient-to-br from-teal-500 to-blue-600 text-white rounded-2xl rounded-tr-none shadow-lg shadow-blue-900/20"
//                                                 : "bg-gray-800 text-gray-100 border border-gray-700 rounded-2xl rounded-tl-none shadow-lg"
//                                                 }`}
//                                         >
//                                             {message.text}
//                                         </div>
//                                     </div>
//                                 ))}

//                                 {/* Bot typing indicator with animation */}
//                                 {isTyping && (
//                                     <div className="flex justify-start">
//                                         <div className="bg-gray-800 text-gray-100 p-3 rounded-2xl rounded-tl-none border border-gray-700 shadow-lg animate-message-in">
//                                             <div className="flex space-x-1">
//                                                 <div className="h-2 w-2 bg-teal-400 rounded-full animate-bounce"></div>
//                                                 <div className="h-2 w-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                                                 <div className="h-2 w-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}

//                                 <div ref={messagesEndRef} />
//                             </div>

//                             {/* Input area with animations */}
//                             <div className="p-3 bg-gray-800 border-t border-gray-700">
//                                 <div className="flex items-center bg-gray-900 rounded-full overflow-hidden border border-gray-700 focus-within:border-teal-500 transition-colors duration-300 shadow-inner">
//                                     <input
//                                         ref={inputRef}
//                                         type="text"
//                                         value={inputValue}
//                                         onChange={handleInputChange}
//                                         onKeyPress={handleKeyPress}
//                                         className="flex-1 bg-transparent py-3 px-4 focus:outline-none text-gray-100 placeholder-gray-500"
//                                         placeholder="Type your message..."
//                                     />
//                                     <button
//                                         onClick={handleSendMessage}
//                                         className={`p-2 mx-1 rounded-full transition-all duration-300 transform ${inputValue.trim() === ""
//                                             ? "bg-gray-700 text-gray-500 cursor-not-allowed"
//                                             : "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:shadow-lg hover:shadow-teal-500/50 hover:scale-105 active:scale-95"
//                                             }`}
//                                         disabled={inputValue.trim() === ""}
//                                     >
//                                         <Send size={18} className={inputValue.trim() !== "" ? "animate-pulse" : ""} />
//                                     </button>
//                                 </div>
//                                 {windowWidth < 640 && (
//                                     <div className="mt-2 text-center text-xs text-gray-500">
//                                         <p>AquaChat AI &copy; {new Date().getFullYear()}</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Chat button - fixed at bottom right */}
//             <button
//                 onClick={toggleChat}
//                 className={`${isChatOpen ? 'scale-90 opacity-0 pointer-events-none' : 'scale-100 opacity-100'} transition-all duration-300 ease-in-out rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shadow-xl group`}
//             >
//                 <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 animate-gradient-x p-[2px]">
//                     <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 opacity-30 blur-md animate-pulse"></div>
//                     <div className="h-full w-full rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-gray-800 transition-colors duration-300">
//                         <MessageCircle size={22} className="text-teal-400 group-hover:scale-110 transition-transform duration-300" />
//                     </div>
//                 </div>

//                 {/* Pulse animation for notification */}
//                 <span className="absolute top-0 right-0 h-3 w-3 sm:h-4 sm:w-4 bg-blue-500 rounded-full border-2 border-gray-900">
//                     <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></span>
//                 </span>
//             </button>
//         </div>
//     );
// };

// // Add custom animations to tailwind
// const customStyles = document.createElement('style');
// customStyles.textContent = `
//   @keyframes gradient-x {
//     0% { background-position: 0% 50%; }
//     50% { background-position: 100% 50%; }
//     100% { background-position: 0% 50%; }
//   }
//   .animate-gradient-x {
//     background-size: 200% 200%;
//     animation: gradient-x 15s ease infinite;
//   }
//   @keyframes message-in {
//     0% { opacity: 0; transform: translateY(10px); }
//     100% { opacity: 1; transform: translateY(0); }
//   }
//   .animate-message-in {
//     animation: message-in 0.3s ease-out forwards;
//   }
//   @keyframes fade-out {
//     0% { opacity: 1; transform: scale(1); }
//     100% { opacity: 0; transform: scale(0.95); }
//   }
//   .animate-fade-out {
//     animation: fade-out 0.5s ease-out forwards;
//   }
//   @keyframes slide-in {
//     0% { opacity: 0; transform: translateY(20px) scale(0.9); }
//     100% { opacity: 1; transform: translateY(0) scale(1); }
//   }
//   .animate-slide-in {
//     animation: slide-in 0.4s ease-out forwards;
//   }
//   /* Custom scrollbar */
//   .scrollbar-thin::-webkit-scrollbar {
//     width: 4px;
//   }
//   .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
//     background: #4B5563;
//     border-radius: 9999px;
//   }
//   .scrollbar-track-transparent::-webkit-scrollbar-track {
//     background: transparent;
//   }

//   /* Media query for small devices */
//   @media (max-width: 640px) {
//     .animate-slide-in {
//       animation: slide-in-mobile 0.4s ease-out forwards;
//     }
//     @keyframes slide-in-mobile {
//       0% { opacity: 0; transform: translateY(100%); }
//       100% { opacity: 1; transform: translateY(0); }
//     }
//   }
// `;
// document.head.appendChild(customStyles);

// export default ChatBot;


import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, X, ChevronDown, Sparkles, MessageCircle } from 'lucide-react';
import axios from 'axios';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const chatContainerRef = useRef(null);

    // API base URL (adjust as needed)
    const API_BASE_URL = `${import.meta.env.VITE_API_BACKEND_URL}/api/v1/data`; // Update with your actual API base URL

    // Fetch session history on mount
    useEffect(() => {
        const fetchSessionHistory = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/session/history`);
                const { success, history } = response.data;
                if (success && history.length > 0) {
                    const historyMessages = history.flatMap((entry) => [
                        { id: `${entry.timestamp}-user`, text: entry.query, sender: 'user', new: false },
                        { id: `${entry.timestamp}-bot`, text: entry.answer, sender: 'bot', new: false },
                    ]);
                    setMessages(historyMessages);
                } else {
                    // Initialize with welcome message if no history
                    setMessages([
                        { id: Date.now(), text: "Hi there! I'm your AI assistant. How can I help you today?", sender: 'bot', new: false },
                    ]);
                }
            } catch (error) {
                console.error('Error fetching session history:', error);
                // Fallback to welcome message on error
                setMessages([
                    { id: Date.now(), text: "Hi there! I'm your AI assistant. How can I help you today?", sender: 'bot', new: false },
                ]);
            }
        };

        fetchSessionHistory();
    }, []);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Determine chat size based on screen width
    const getChatSize = () => {
        if (windowWidth < 640) {
            return {
                width: 'w-full',
                height: 'h-[80vh]',
                position: 'bottom-0 right-0 left-0',
                rounded: 'rounded-t-2xl rounded-b-none',
            };
        } else if (windowWidth < 768) {
            return {
                width: isExpanded ? 'w-[90vw]' : 'w-64',
                height: 'h-[500px]',
                position: 'bottom-4 right-4',
                rounded: 'rounded-2xl',
            };
        } else {
            return {
                width: isExpanded ? 'w-96' : 'w-72',
                height: 'h-[500px]',
                position: 'bottom-4 right-4',
                rounded: 'rounded-2xl',
            };
        }
    };

    const chatSize = getChatSize();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = async () => {
        if (inputValue.trim() === '') return;

        // Add user message
        const userMessageId = Date.now();
        setMessages((prev) => [...prev, { id: userMessageId, text: inputValue, sender: 'user', new: true }]);
        setInputValue('');
        setIsTyping(true);

        // Focus input after sending
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);

        try {
            // Send query to chatbot API
            const response = await axios.post(`${API_BASE_URL}/query/chatbot`, {
                queryText: inputValue,
                numberOfPassages: 5,
            });

            const { success, answer, message } = response.data;

            if (!success) {
                throw new Error(message || 'Failed to process query');
            }

            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                { id: Date.now(), text: answer, sender: 'bot', new: true },
            ]);
        } catch (error) {
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                { id: Date.now(), text: 'Sorry, something went wrong. Please try again.', sender: 'bot', new: true },
            ]);
            console.error('Error querying chatbot:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const resetSession = async () => {
        // Add fade-out animation to all messages
        setMessages((prev) => prev.map((msg) => ({ ...msg, removing: true })));

        try {
            // Clear session history via API
            await axios.get(`${API_BASE_URL}/session/clear-history`);
            // Reset messages after animation
            setTimeout(() => {
                setMessages([
                    { id: Date.now(), text: 'Chat reset! How can I help you today?', sender: 'bot', new: true },
                ]);
            }, 500);
        } catch (error) {
            console.error('Error clearing session:', error);
            // Reset messages even if API fails
            setTimeout(() => {
                setMessages([
                    { id: Date.now(), text: 'Chat reset! How can I help you today?', sender: 'bot', new: true },
                ]);
            }, 500);
        }
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
        if (!isChatOpen) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // Auto-scroll to bottom when messages change
    // useEffect(() => {
    //     if (isChatOpen) {
    //         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    //     }

    //     // Remove "new" flag after animation
    //     const timer = setTimeout(() => {
    //         setMessages((prev) => prev.map((msg) => ({ ...msg, new: false })));
    //     }, 700);

    //     return () => clearTimeout(timer);
    // }, [messages, isChatOpen]);

    // Auto-scroll to bottom only when a new message is added
    useEffect(() => {
        // Check if the last message is new (user or bot)
        const hasNewMessage = messages.length > 0 && messages[messages.length - 1].new;

        if (isChatOpen && hasNewMessage) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }

        // Remove "new" flag after animation
        const timer = setTimeout(() => {
            setMessages((prev) => prev.map((msg) => ({ ...msg, new: false })));
        }, 700);

        return () => clearTimeout(timer);
    }, [messages, isChatOpen]);

    // Get appropriate bottom position for chat button
    const getChatButtonPosition = () => {
        if (windowWidth < 640) {
            return 'bottom-6';
        }
        return 'bottom-4';
    };

    return (
        <div className={`fixed z-50 ${getChatButtonPosition()} right-4 md:right-4`}>
            {isChatOpen && (
                <div
                    ref={chatContainerRef}
                    className={`flex flex-col ${chatSize.width} ${chatSize.height} ${windowWidth < 640 ? '' : 'mb-4'
                        } transition-all duration-500 ease-in-out animate-slide-in fixed ${chatSize.position}`}
                >
                    <div
                        className={`absolute inset-0 ${chatSize.rounded} p-[2px] bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 animate-gradient-x`}
                    >
                        <div
                            className={`absolute inset-0 ${chatSize.rounded} bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 opacity-30 blur-md animate-pulse`}
                        ></div>
                        <div
                            className={`relative h-full w-full bg-gray-900 ${chatSize.rounded} overflow-hidden flex flex-col shadow-2xl`}
                        >
                            <div className="bg-gray-800 px-4 py-3 flex justify-between items-center border-b border-gray-700">
                                <div className="flex items-center space-x-2">
                                    <div className="relative">
                                        <div className="h-3 w-3 bg-teal-500 rounded-full"></div>
                                        <div className="absolute inset-0 bg-teal-500 rounded-full animate-ping opacity-75"></div>
                                    </div>
                                    <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-bold text-lg">
                                        PulseBot AI
                                    </h1>
                                    <Sparkles size={16} className="text-teal-400 animate-pulse" />
                                </div>
                                <div className="flex items-center space-x-1">
                                    {windowWidth >= 640 && (
                                        <button
                                            onClick={toggleExpand}
                                            className="text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-full p-1.5 transition-colors duration-200"
                                            aria-label="Toggle size"
                                        >
                                            <ChevronDown
                                                size={14}
                                                className={`transform transition-transform duration-300 ${isExpanded ? '' : 'rotate-180'
                                                    }`}
                                            />
                                        </button>
                                    )}
                                    <button
                                        onClick={resetSession}
                                        className="text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-full p-1.5 transition-colors duration-200"
                                        aria-label="Reset chat"
                                    >
                                        <RefreshCw size={14} className="hover:rotate-180 transition-transform duration-500" />
                                    </button>
                                    <button
                                        onClick={toggleChat}
                                        className="text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-full p-1.5 transition-colors duration-200"
                                        aria-label="Close chat"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            </div>
                            <div
                                className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
                                style={{
                                    backgroundImage: `
                    radial-gradient(circle at 20% 30%, rgba(13, 148, 136, 0.15) 0%, transparent 50%), 
                    radial-gradient(circle at 80% 70%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)
                  `,
                                }}
                            >
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'
                                            } ${message.removing ? 'animate-fade-out' : ''}`}
                                    >
                                        <div
                                            className={`max-w-[75%] sm:max-w-xs p-3 ${message.new ? 'animate-message-in' : ''} ${message.sender === 'user'
                                                ? 'bg-gradient-to-br from-teal-500 to-blue-600 text-white rounded-2xl rounded-tr-none shadow-lg shadow-blue-900/20'
                                                : 'bg-gray-800 text-gray-100 border border-gray-700 rounded-2xl rounded-tl-none shadow-lg'
                                                }`}
                                        >
                                            {message.text}
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-gray-800 text-gray-100 p-3 rounded-2xl rounded-tl-none border border-gray-700 shadow-lg animate-message-in">
                                            <div className="flex space-x-1">
                                                <div className="h-2 w-2 bg-teal-400 rounded-full animate-bounce"></div>
                                                <div
                                                    className="h-2 w-2 bg-teal-400 rounded-full animate-bounce"
                                                    style={{ animationDelay: '0.2s' }}
                                                ></div>
                                                <div
                                                    className="h-2 w-2 bg-teal-400 rounded-full animate-bounce"
                                                    style={{ animationDelay: '0.4s' }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="p-3 bg-gray-800 border-t border-gray-700">
                                <div className="flex items-center bg-gray-900 rounded-full overflow-hidden border border-gray-700 focus-within:border-teal-500 transition-colors duration-300 shadow-inner">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress}
                                        className="flex-1 bg-transparent py-3 px-4 focus:outline-none text-gray-100 placeholder-gray-500"
                                        placeholder="Type your message..."
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        className={`p-2 mx-1 rounded-full transition-all duration-300 transform ${inputValue.trim() === ''
                                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:shadow-lg hover:shadow-teal-500/50 hover:scale-105 active:scale-95'
                                            }`}
                                        disabled={inputValue.trim() === ''}
                                    >
                                        <Send size={18} className={inputValue.trim() !== '' ? 'animate-pulse' : ''} />
                                    </button>
                                </div>
                                {windowWidth < 640 && (
                                    <div className="mt-2 text-center text-xs text-gray-500">
                                        <p>PulseBot AI © {new Date().getFullYear()}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <button
                onClick={toggleChat}
                className={`${isChatOpen ? 'scale-90 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
                    } transition-all duration-300 ease-in-out rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shadow-xl group`}
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 animate-gradient-x p-[2px]">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 opacity-30 blur-md animate-pulse"></div>
                    <div className="h-full w-full rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-gray-800 transition-colors duration-300">
                        <MessageCircle
                            size={22}
                            className="text-teal-400 group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                </div>
                <span className="absolute top-0 right-0 h-3 w-3 sm:h-4 sm:w-4 bg-blue-500 rounded-full border-2 border-gray-900">
                    <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></span>
                </span>
            </button>
        </div>
    );
};

// Add custom animations to Tailwind
const customStyles = document.createElement('style');
customStyles.textContent = `
  @keyframes gradient-x {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 15s ease infinite;
  }
  @keyframes message-in {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-message-in {
    animation: message-in 0.3s ease-out forwards;
  }
  @keyframes fade-out {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0.95); }
  }
  .animate-fade-out {
    animation: fade-out 0.5s ease-out forwards;
  }
  @keyframes slide-in {
    0% { opacity: 0; transform: translateY(20px) scale(0.9); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  .animate-slide-in {
    animation: slide-in 0.4s ease-out forwards;
  }
  .scrollbar-thin::-webkit-scrollbar {
    width: 4px;
  }
  .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
    background: #4B5563;
    border-radius: 9999px;
  }
  .scrollbar-track-transparent::-webkit-scrollbar-track {
    background: transparent;
  }
  @media (max-width: 640px) {
    .animate-slide-in {
      animation: slide-in-mobile 0.4s ease-out forwards;
    }
    @keyframes slide-in-mobile {
      0% { opacity: 0; transform: translateY(100%); }
      100% { opacity: 1; transform: translateY(0); }
    }
  }
`;
document.head.appendChild(customStyles);

export default ChatBot;