import { useState, useEffect } from "react";
import { FaRocket } from "react-icons/fa";

const CountdownTimer = () => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 15);

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-3xl shadow-xl text-center w-full max-w-lg">
        <h2 className="text-white text-3xl font-bold flex justify-center items-center gap-2">
          <FaRocket className="text-pink-500 animate-bounce" /> Something amazing is on the way!
        </h2>
        <p className="text-red-400 mt-2 text-lg"></p>
        <p className="text-gray-300 mt-4 text-sm">
        Prepare for a groundbreaking update that will transform your coding experience! Our team is developing an exclusive feature designed to elevate your skills like never before. Stay tuned!
        </p>
        <div className="flex justify-center mt-8 text-white text-lg font-semibold">
          <div className="bg-gray-700 p-4 mx-2 rounded-lg w-20 text-center shadow-md">
            {timeLeft.days} <br /> <span className="text-sm">Days</span>
          </div>
          <div className="bg-gray-700 p-4 mx-2 rounded-lg w-20 text-center shadow-md">
            {timeLeft.hours} <br /> <span className="text-sm">Hours</span>
          </div>
          <div className="bg-gray-700 p-4 mx-2 rounded-lg w-20 text-center shadow-md">
            {timeLeft.minutes} <br /> <span className="text-sm">Minutes</span>
          </div>
          <div className="bg-gray-700 p-4 mx-2 rounded-lg w-20 text-center shadow-md">
            {timeLeft.seconds} <br /> <span className="text-sm">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
