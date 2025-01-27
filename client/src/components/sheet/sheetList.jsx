import React from "react";
import SheetCard from "./sheetCard";
import image1 from "../../assets/sheet1.png";
import image2 from "../../assets/sheet2.png";
import image3 from "../../assets/sheet3.png";

const SheetList = () => {
  const courses = [
    {
      title: "Love Babber DSA Sheet",
      problem: "440",
      Level: "Beginner",
      image: image1,
    },
    {
      title: "Striver DSA Sheet",
      problem: "320",
      Level: "Beginner",
      image: image2,
    },
    {
      title: "75 Blind Problem",
      problem: "75",
      Level: "Beginner",
      image: image3,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course, index) => (
        <SheetCard key={index} {...course} />
      ))}
    </div>
  );
};

export default SheetList;
