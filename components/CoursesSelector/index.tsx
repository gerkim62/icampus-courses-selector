"use client";

import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import Select from "react-select";

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
};

const CoursesSelector = ({ options }: Props) => {
  const router = useRouter();

  const handleNext = () => {
    console.log("next");

    if (selectedCourseCodes.length < 4) {
      return toast.error("Too few courses selected.");
    }

    const encodedCourseCodes = encodeURIComponent(
      selectedCourseCodes.join(",")
    );
    router.push(`/view?course_codes=${encodedCourseCodes}`);
  };
  // start of optimization
  const [isPending, startTransition] = useTransition();
  const [selectedCourseCodes, setSelectedCourseCodes] = useState<string[]>([]);
  return (
    <div className="max-w-md mx-auto">
      <Select
        onFocus={() => startTransition(() => {})}
        onInputChange={() => startTransition(() => {})}
        isLoading={isPending}
        // end of optimization

        placeholder={`Search...`}
        noOptionsMessage={() => "Course not found."}
        loadingMessage={() => "Searching..."}
        options={options}
        isMulti
        autoFocus
        name="courses"
        className=" flex-grow"
        classNamePrefix="select"
        onChange={(selectedOptions) => {
          setSelectedCourseCodes(selectedOptions.map((option) => option.value));
        }}
      />

      {/* Next button */}
      <div className="w-full mt-4">
        <button
          onClick={handleNext}
          className="bg-emerald-500 text-white flex items-center justify-center px-4 py-2 rounded-md w-full hover:bg-emerald-600"
        >
          Next <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default CoursesSelector;
