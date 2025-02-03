import React from "react";
import { FaUser, FaCalendarAlt, FaShareAlt } from "react-icons/fa";
import image from "../../assets/OBJECTS.png";

const Article = () => {
  return (
    <div className="w-full md:w-3/4 mx-auto p-4 md:p-14">
      {/* Article Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        How to Build Scalable Web Applications
      </h1>

      {/* Metadata */}
      <div className="flex items-center text-gray-600 text-sm mb-4">
        <FaUser className="mr-2" />
        <span className="mr-4">John Doe</span>
        <FaCalendarAlt className="mr-2" />
        <span>Feb 3, 2025</span>
      </div>

      {/* Featured Image */}
      <img
        src={image}
        alt="Article"
        className="w-full h-auto md:h-64 object-cover rounded-lg mb-6"
      />

      {/* Article Content */}
      <div className="text-gray-800 leading-relaxed space-y-4">
        <p>
          In today's fast-paced world, building scalable web applications is
          more important than ever. Scalability ensures that applications can
          handle increasing workloads efficiently.
        </p>
        <p>
          The key to scalability lies in architecture choices, database
          optimization, and leveraging modern frameworks like React, Next.js,
          and Node.js. Using microservices and serverless computing can also
          improve performance.
        </p>
        <p>
          Implementing caching mechanisms, optimizing queries, and using CDNs
          help improve speed and reduce server load.
        </p>
      </div>

      {/* Social Share Icons */}
      <div className="flex items-center justify-between mt-6">
        <span className="text-gray-600">Share this article:</span>
        <div className="flex space-x-4">
          <FaShareAlt className="text-xl text-gray-700 cursor-pointer hover:text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default Article;
