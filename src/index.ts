// Export the component as both default and named export
import Chatbot from './components/Chatbot';

export { Chatbot };

// Also re-export any types
export type { ChatbotProps } from './components/Chatbot';

// Default export for easier importing
export default Chatbot;

import './components/chatbot.css';