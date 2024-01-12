import { uploadCoursesHtml } from "@/actions";
import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: {
    error?: string;
    success?: "true" | "false";
  };
};

const page = (props: Props) => {
  const { error } = props.searchParams;
  const success = props.searchParams.success === "true";

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center fullHeight max-w-[95%] mx-auto">
        <h1 className="text-xl font-semibold mb-4 text-emerald-600">
          Courses Timetable Updated Successfully
        </h1>

        <p className="text-gray-600 text-center">
          Your courses timetable has been updated successfully. You can now{" "}
          <Link
            href="/courses"
            className="text-emerald-600 hover:underline hover:text-emerald-700 capitalize font-semibold transition duration-300 underline"
          >
            Select Your Courses
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form
      action={uploadCoursesHtml}
      className="flex flex-col items-center justify-center fullHeight max-w-[95%] mx-auto"
    >
      <h1 className="text-xl font-semibold mb-4 text-emerald-600">
        Upload Updated Courses Timetable
      </h1>

      <ul className="text-gray-600 list-inside list-disc">
        <li>Download the UEAB Courses timetable from your email</li>
        <li>
          Go to{" "}
          <a
            target="_blank"
            className="text-emerald-600 mt-4 hover:underline hover:text-emerald-700 capitalize font-semibold transition duration-300 underline"
            href="https://xodo.com/convert-pdf-to-html"
          >
            PDF to HTML converter
          </a>{" "}
          and convert it to HTML
        </li>
        <li>Then come back here and upload the converted file as HTML</li>
        <li>It will be used in selecting your courses</li>
      </ul>

      <div className="flex items-center justify-center m-5 max-w-md ">
        <input type="file" accept=".html" name="htmlFile" id="" />
      </div>

      {error && <p className="text-red-500 text-sm my-2">{error}</p>}

      <SubmitButton />
    </form>
  );
};

export default page;
