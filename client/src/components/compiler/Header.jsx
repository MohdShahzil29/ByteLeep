import React from "react";
import { FaReact } from "react-icons/fa";
import SeoLayout from "../SeoLayout"; 

const Header = () => {
  return (
    <>
      {/* SEO Metadata */}
      <SeoLayout
        title="Byte Leep Compiler"
        description="Practice coding on the Byte Leep Compiler page."
        keywords="ByteLeep, compiler, coding, programming"
      />

      <header className="bg-white">
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-11 mb-4 text-center">
            BYTE LEEP COMPILER PAGE
          </h1>
          <p className="text-base sm:text-lg mb-8 text-center">
            Welcome to the ByteLeep compiler page! Here you can practice your
            coding skills.
          </p>
        </div>
      </header>
    </>
  );
};

export default Header;
