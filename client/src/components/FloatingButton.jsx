import { useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import ChatModal from "./ChatModal";

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
      >
        <FiMessageCircle size={24} />
      </button>
      {isOpen && <ChatModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default FloatingButton;
