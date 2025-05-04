import { useState } from "react";
import "./chatbot.css";

export type ChatbotProps = {
  apiUrl?: string; // Backend API URL
  onNavigate?: (url: string) => void; // Function for navigation
  onFilter?: (query: Record<string, string>) => void; // Function for AG Grid filtering
};

const Chatbot = ({ onNavigate, onFilter }: ChatbotProps) => {
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([]);
  const [input, setInput] = useState("");

  const sendUserMessage = async () => {
    if (!input.trim()) return;

    // Simulating different responses using a dummy AI logic
    const mockResponse = await new Promise<{ intent: string; response: string; url?: string; query?: Record<string, string> }>((resolve) =>
      setTimeout(() => {
        const lowerText = input.toLowerCase();
        if (lowerText.includes("go to") || lowerText.includes("navigate")) {
          resolve({
            intent: "navigate",
            response: `Navigating to the requested page...`,
            url: "/dashboard",
          });
        } else if (lowerText.includes("filter")) {
          resolve({
            intent: "filter",
            response: `Filtering records...`,
            query: { field: "customerName", operator: "contains", value: "John" },
          });
        } else {
          resolve({
            intent: "general",
            response: `I'm here to assist! Ask me anything.`,
          });
        }
      }, 1000) // Simulated AI delay
    );

    setMessages([...messages, { text: input, sender: "user" }, { text: mockResponse.response, sender: "bot" }]);

    // Handle navigation and filtering actions via parent props
    if (mockResponse.intent === "navigate" && onNavigate) onNavigate(mockResponse.url!);
    if (mockResponse.intent === "filter" && onFilter) onFilter(mockResponse.query!);

    setInput("");
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">AI Chatbot</div>
      <div className="chatbot-body">
        {messages.map((msg, idx) => (
          <p
            key={idx}
            className={msg.sender === "user" ? "user-msg" : "bot-msg"}
          >
            {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={sendUserMessage}>Send</button>
    </div>
  );
};

// Default export
export default Chatbot;
