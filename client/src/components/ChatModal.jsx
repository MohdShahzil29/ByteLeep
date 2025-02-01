import { useState } from "react";
import axios from "axios";

const ChatModal = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);

      setInput("");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/gemini`,
          {
            prompt: input,
          }
        );
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.response, sender: "ai" },
        ]);
      } catch (error) {
        console.error("Error calling Gemini API:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Sorry, something went wrong. Please try again.",
            sender: "ai",
          },
        ]);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-16 right-5 w-80 bg-white rounded-3xl shadow-lg border border-gray-300 flex flex-col z-50">
      <div className="bg-gradient-to-r from-[#FDF8EE] to-[#FFE2CC] text-black p-4 rounded-t-3xl font-semibold flex justify-between items-center shadow-md">
        <span className="text-lg">Chat Support</span>
        <button
          onClick={onClose}
          className="text-sm bg-red-500 px-3 py-1 rounded-full hover:bg-red-600 transition duration-200"
        >
          X
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 h-72 max-h-72">
        {/* Messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-200 ml-auto text-right shadow-md"
                : "bg-gray-100 text-left shadow-sm"
            }`}
          >
            <pre className="whitespace-pre-wrap">{msg.text}</pre>
          </div>
        ))}
      </div>
      <div className="flex border-t border-gray-300 p-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 p-3 border rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-6 py-2 rounded-r-2xl hover:bg-blue-700 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatModal;
