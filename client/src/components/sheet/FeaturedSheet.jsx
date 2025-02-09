import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'

const FeaturedSheet = () => {
  const navigate = useNavigate();


  const fullDescription = `Master the essential 75 blind DSA problems to ace coding interviews! These handpicked problems cover all key data structures and algorithms, including arrays, linked lists, trees, graphs, dynamic programming, and more. By solving them, you’ll build a strong foundation, improve problem-solving skills, and boost confidence for top tech company interviews. Each problem is carefully selected to maximize learning efficiency, helping you recognize patterns and apply optimal solutions quickly. Whether you're a beginner or an experienced coder refining your skills, this set will enhance your understanding and speed. With just 75 problems, you can efficiently prepare for coding interviews without getting overwhelmed. Stay consistent, track progress, and practice regularly to achieve mastery. Start your journey today and take a step closer to landing your dream job!`;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg">
      <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29kaW5nfGVufDB8fDB8fHww"
          alt="card-image"
          className="h-full w-full rounded-md md:rounded-lg object-cover"
        />
      </div>
      <div className="p-6">
        <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-24 text-center">
          Popular Sheet
        </div>
        <h4 className="mb-2 text-slate-800 text-xl font-semibold">
          75 Blind DSA Problems: Master Coding Fast
        </h4>
        <p className="mb-4 text-slate-600 leading-normal font-light">
          {isMobile
            ? `${fullDescription.substring(0, 150)}...`
            : fullDescription}
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer"
        onClick={(() => navigate('/problem-list/75-blind'))}
        >
          Start Today
        </button>
      </div>
    </div>
  );
};

export default FeaturedSheet;
