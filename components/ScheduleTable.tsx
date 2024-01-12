import { Course } from "@prisma/client";
import React from "react";

type Props = {
  courses: Course[];
};

const ScheduleTable = ({ courses }: Props) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap">
          <tr>
            <th scope="col" className="px-6 py-3">
              Course Code
            </th>
            <th scope="col" className="px-6 py-3">
              Course Title
            </th>
            <th scope="col" className="px-6 py-3">
              Instructor
            </th>
            <th scope="col" className="px-6 py-3">
              Days
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Room
            </th>
            <th>Group</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr
              key={course.id}
              className="bg-white dark:bg-gray-800 whitespace-nowrap"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {course.courseCode}
              </td>
              <td className="px-6 py-4 max-w-[25ch] overflow-hidden whitespace-nowrap overflow-ellipsis">
                {course.courseTitle}
              </td>

              <td className="px-6 py-4">{course.instructor}</td>
              <td className="px-6 py-4 capitalize">{course.days.join(", ")}</td>
              <td className="px-6 py-4">{`${course.starting} - ${course.ending}`}</td>
              <td className="px-6 py-4">{course.room}</td>
              <td className="px-6 py-4">{course.group}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
