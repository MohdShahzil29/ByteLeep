import React from "react";
import { FaCode, FaLaptopCode, FaCheckCircle, FaUser } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Welcome to Byte Leep
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock your full potential with our all-in-one coding hub designed
            for aspiring developers and seasoned professionals alike. Whether
            you’re looking to master data structures and algorithms, experiment
            with web development, or prepare for high-stakes technical
            interviews, our platform has you covered.
          </p>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
              <FaCode className="text-4xl text-blue-500 mr-6" />
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Interactive DSA Practice
                </h3>
                <p className="text-gray-600">
                  Tackle a diverse set of problems from basic to advanced,
                  complete with detailed explanations and performance analytics.
                </p>
              </div>
            </div>
            <div className="flex bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
              <FaLaptopCode className="text-4xl text-green-500 mr-6" />
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Multi-Language Online Compiler
                </h3>
                <p className="text-gray-600">
                  Write, compile, and run code in multiple languages directly
                  from your browser.
                </p>
              </div>
            </div>
            <div className="flex bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
              <FaCheckCircle className="text-4xl text-purple-500 mr-6" />
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Web Development Sandbox
                </h3>
                <p className="text-gray-600">
                  Build and deploy web projects with our integrated tools,
                  tutorials, and live coding environment.
                </p>
              </div>
            </div>
            <div className="flex bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
              <FaCheckCircle className="text-4xl text-red-500 mr-6" />
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Interview Preparation Assessments
                </h3>
                <p className="text-gray-600">
                  Prepare for technical interviews with targeted assessments and
                  mock challenges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About the Creator Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            About the Creator
          </h2>
          <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
            <div className="mb-4 md:mb-0 md:mr-6">
              <FaUser className="text-6xl text-indigo-500" />
            </div>
            <p className="text-xl text-gray-600">
              This platform is proudly developed by Mohd Shahzil, a final year
              BCA student at Lotus Institute of Management, Bareilly. Driven by
              a passion for coding and a desire to empower fellow learners, he
              created this space to provide an all-in-one resource for mastering
              coding skills, exploring web development, and acing technical
              interviews.
            </p>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform brings together the best elements of modern coding
            practice, education, and interview preparation in one unified space.
            Designed for both beginners and experienced programmers, we offer an
            intuitive, engaging, and growth-oriented environment that empowers
            you to learn, code, and succeed.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
