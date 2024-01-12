import React from "react";

const MotivationPage = () => {
  return (
    <div className="fullHeight flex items-center justify-center bg-gray-100">
      <div className=" p-4 max-w-[70ch] mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Motivation Behind the App
        </h1>
        <p className="text-base sm:text-lg lg:text-xl mb-6">
          I created this tool with the intention to help everyone streamline
          their course selection process. The goal is to simplify the experience
          and make it more accessible for users to find and choose the advanced
          iCampus courses that best suit their needs.
        </p>
        <p className="text-base sm:text-lg lg:text-xl mb-6">
          Education is a powerful tool, and I believe that by making it easier
          for individuals to navigate and select courses, we can contribute to a
          more inclusive and efficient learning environment.
        </p>
        <p className="text-base sm:text-lg lg:text-xl">
          Thank you for using this experiment, and I hope it enhances your
          experience in exploring and selecting courses on iCampus.
        </p>
      </div>
    </div>
  );
};

export default MotivationPage;
