"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
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
  //courses from url
  const searchParams = useSearchParams();
  const courseCodesFromUrl = searchParams.get("course_codes") || "";
  const courseCodesFromUrlArray = courseCodesFromUrl.split(",").filter(Boolean);
  console.log(courseCodesFromUrlArray);
  const [selectedCourseCodes, setSelectedCourseCodes] = useState<string[]>(
    courseCodesFromUrlArray
  );

  //each time selected course codes change, update the url
  useEffect(() => {
    const encodedCourseCodes = encodeURIComponent(
      selectedCourseCodes.join(",")
    );
    router.replace(`/select?course_codes=${encodedCourseCodes}`);
  }, [selectedCourseCodes]);
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
        value={options.filter((option) =>
          selectedCourseCodes.includes(option.value)
        )}
        onChange={(selectedOptions) => {
          setSelectedCourseCodes(selectedOptions.map((option) => option.value));
        }}
      />

      {/* Next button */}
      <div className="w-full mt-4">
        <button
          disabled={isPending}
          onClick={handleNext}
          className="bg-emerald-500 text-white flex items-center justify-center px-4 py-2 rounded-md w-full hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default CoursesSelector;
