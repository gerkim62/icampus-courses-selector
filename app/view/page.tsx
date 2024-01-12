import React from "react";
import prisma from "@/libs/prisma";
import { findAllScheduleCombinations } from "@/utils";
import ScheduleTable from "@/components/ScheduleTable";
import Pagination from "@/components/Pagination";
import { unstable_noStore } from "next/cache";

type Props = {
  searchParams: {
    course_codes: string;
  };
};

const page = async (props: Props) => {
  unstable_noStore();
  const courseCodes = props.searchParams.course_codes.split(",");
  console.log(courseCodes);

  const courses = await prisma.course.findMany({
    where: {
      courseCode: {
        in: courseCodes,
      },
    },
  });

  //   console.log(courses);

  const combinations = findAllScheduleCombinations(courses);
  console.log(JSON.stringify(combinations, null, 2));

  return (
    <div className="container sm:mx-auto  bg-white dark:bg-gray-900 shadow-xs rounded-md mx-2">
      <h1 className=" font-bold mb-2 text-gray-800 dark:text-white text-lg sm:text-center mx-2">
        The choice is yours!
      </h1>

      <p className=" text-gray-600 dark:text-gray-400 mb-4 text-sm sm:mx-auto sm:text-center mx-2">
        All schedules listed have no time conflicts. Feel free to pick any of
        them.
      </p>

      <div className="grid grid-cols-1  gap-4">
        {combinations.map((combination, index) => (
          <div key={index} className="mb-4">
            <ScheduleTable courses={combination} />
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
          </div>
        ))}
      </div>

      {/* <Pagination
        currentPage={1}
        totalPages={100}
        searchParams={props.searchParams}
      /> */}
    </div>
  );
};

export default page;
