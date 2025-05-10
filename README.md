# NewsBot Frontend

Welcome to the **NewsBot Frontend**, a sleek, modern, and responsive chat interface built with **React** and **Tailwind CSS**. This frontend powers an intelligent news chatbot, seamlessly integrating with a Node.js backend to deliver real-time query processing, session history, and dynamic conversations. With a visually stunning UI, smooth animations, and advanced features like session reset and dynamic query handling, this frontend exceeds the assignment objectives, providing an exceptional user experience.

## 🌟 Key Features

### 1. Modern Chat Interface

- **Dynamic Chat Screen**: Displays past messages with distinct styling for user and bot responses.
- **Input Box**: Intuitive text input with Enter key support and a Send button that pulses when active.
- **Session History**: Loads and displays session history from the backend, preserving conversations across sessions.
- **Reset Button**: Clears session history with a smooth fade-out animation, resetting the chat to a fresh state.

### 2. Responsive & Animated UI

- **Tailwind CSS**: Delivers a clean, modern design with gradient backgrounds and subtle animations.
- **Responsive Design**:
  - Mobile: Full-screen chat with rounded top corners.
  - Tablet/Desktop: Floating chat window with expandable width (72px to 96px).
- **Custom Animations**:
  - Gradient backgrounds with `animate-gradient-x`.
  - Message slide-in (`animate-message-in`) and fade-out (`animate-fade-out`).
  - Chat window slide-in (`animate-slide-in`) for smooth opening.
- **Typing Indicator**: Animated dots for bot responses, enhancing user engagement.

### 3. Seamless Backend Integration

- **Axios with Credentials**: Uses `withCredentials: true` for secure session cookie handling, ensuring consistent session history.
- **API Integration**:
  - Queries the backend’s `/query/chatbot` endpoint for answers.
  - Fetches session history from `/session/history`.
  - Clears sessions via `/session/clear-history`.
- **Error Handling**: Gracefully handles API errors with fallback messages, ensuring a robust user experience.

### 4. Beyond Objectives

- **Dynamic Session Loading**: Automatically loads session history on mount, with a welcome message if no history exists.
- **Smooth Scrolling**: Auto-scrolls to new messages only when they’re added, avoiding disruptive scrolling.
- **Accessibility**: Includes ARIA labels for buttons (e.g., “Reset chat”, “Close chat”).
- **Visual Polish**: Gradient borders, pulsing status indicators, and hover effects elevate the UI beyond basic requirements.
- **No Streaming Dependency**: Achieves a typed-out reply effect without requiring streaming, simplifying implementation.

## 🛠️ Setup

### Prerequisites

- **Node.js** (v16+)
- **Backend Server**: Running NewsBot Backend (see backend README).
- **Vite**: For development and build.

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd chatbot/frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `frontend` directory:

   ```env
   VITE_API_BACKEND_URL=http://localhost:5000
   ```

4. **Start the frontend**:
   ```bash
   npm run dev
   ```
   The app runs on `http://localhost:5173` (or your configured port).

## 🎨 UI Components

- **Chat Container**: Floating or full-screen chat window with gradient borders.
- **Message Bubbles**:
  - User: Teal-to-blue gradient, right-aligned.
  - Bot: Gray with border, left-aligned.
- **Control Buttons**:
  - Expand/Collapse: Toggles chat width (desktop).
  - Reset: Rotates icon on hover.
  - Close: Smoothly hides the chat.
- **Input Bar**: Rounded with a dynamic Send button and placeholder text.

## 🚀 Performance & Optimization

- **Efficient State Management**: Uses React hooks (`useState`, `useEffect`, `useRef`) for minimal re-renders.
- **Lazy Loading**: Loads session history only on component mount.
- **Smooth Animations**: Optimized CSS animations with Tailwind for performance.
- **Responsive Design**: Adapts to screen sizes with zero layout shifts.

## 🛡️ Security

- **Credentialed Requests**: Ensures session cookies are sent securely with `withCredentials: true`.
- **Input Validation**: Disables the Send button for empty inputs, preventing unnecessary API calls.
- **Error Recovery**: Displays user-friendly error messages for failed API requests.

## 📚 Technologies

- **React**: Core framework.
- **Tailwind CSS**: Styling and responsive design.
- **Axios**: API requests.
- **Lucide Icons**: Modern, lightweight icons.
- **Vite**: Fast development and build tool.

## 📝 License

MIT

---

**Built with 💻 and ☕ by [Your Name]**
