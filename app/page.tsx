import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri"; // Replace with the appropriate icon from react-icons

const YourComponent = () => {
  return (
    <div className="fullHeight flex items-center justify-center bg-gray-100 text-black">
      <div className="text-center w-md max-w-[90%]">
        <h1 className="text-xl sm:text-4xl font-bold mb-4">
          Welcome to Advanced iCampus Courses Selector
        </h1>
        <p className="text-lg mb-6">
          This app is a helpful experimental app that helps you choose courses
          that do not have conflicts with each other for the new iCampus system.
        </p>
        <p className="text-sm m-5">
          The app is using the pdf timetable that was sent via email.
        </p>

        <Link
          href="/motivation" // Replace with the actual link to the motivation page
          className="text-lg underline mb-6 block"
        >
          My Motivation
        </Link>
        <Link
          href="/select"
          className="bg-white text-emerald-500 py-2 px-4 rounded-full block w-40 mx-auto border-2 border-emerald-500 hover:bg-emerald-500 hover:text-white font-bold whitespace-nowrap leading-tight"
        >
          <span className="flex justify-center items-center">
            {" "}
            Get Started <RiArrowRightSLine className="ml-2 text-lg" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default YourComponent;
