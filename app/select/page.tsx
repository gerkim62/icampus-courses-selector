import prisma from "@/libs/prisma";
import Select from "@/components/CoursesSelector";
import { FaArrowRight } from "react-icons/fa";
import { unstable_noStore } from "next/cache";
async function page() {
  unstable_noStore();
  const courses = await prisma.course.findMany();
  //uniqu courses based on courseCode

  const uniqueCourses = courses.filter(
    (course, index, self) =>
      index === self.findIndex((c) => c.courseCode === course.courseCode)
  );

  //compare the length of the two arrays
  console.log(courses.length);
  console.log(uniqueCourses.length);

  //remove those without days
  const coursesWithDays = uniqueCourses.filter((course) => course.days.length);
  console.log(coursesWithDays.length);
  const options = uniqueCourses.map((course) => ({
    label: `${course.courseCode}-${course.courseTitle}`,
    value: course.courseCode,
  }));

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 max-w-md mx-auto">
        Choose Your Courses
      </h1>

      {/* Select component */}
      <Select options={options} />

      <p className="text-gray-600 mb-8 text-sm max-w-md mx-auto mt-4">
        Select your courses for the semester and click &#34;Next.&#34; The
        software will create an optimal schedule for you, avoiding any time
        conflicts.
      </p>

      <p className="text-gray-600 mb-8 text-sm max-w-md mx-auto">
        I am using the timetable that was sent via email. If you find an error
        please let me know. I will try to fix it as soon as possible.
      </p>

      <p className="text-gray-600 mb-8 text-sm max-w-md mx-auto">
        This app is not affiliated with the university. It is a personal project
        that I made to help me and my friends. I hope you find it useful.
      </p>
    </div>
  );
}

export default page;
