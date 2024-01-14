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

      <p className="text-gray-600 mb-8 text-sm max-w-md mx-auto">
        Select your courses for the semester and click &#34;Next.&#34; The
        software will create an optimal schedule for you, avoiding any time
        conflicts.
      </p>

      <p className="text-gray-600 mb-8 text-sm max-w-md mx-auto">
        Some courses have no date in the timetable that is available to us,
        hence not listed here.
      </p>

      {/* Select component */}
      <Select options={options} />
    </div>
  );
}

export default page;
