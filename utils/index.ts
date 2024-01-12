import { Course } from "@prisma/client";

function findAllScheduleCombinations(
  courses: Course[],
  { minCoursesCount = 2 }: { minCoursesCount?: number } = {}
) {
  function hasTimeConflict(courseA: Course, courseB: Course): boolean {
    if (!courseA || !courseB) {
      console.log("hasTimeConflict received invalid input:", courseA, courseB);
      return false;
    }

    const parseTime = (timeString: string): Date => {
      const [hours, minutes] = timeString.split(":").map(Number);
      const date = new Date();
      date.setHours(hours, minutes);
      return date;
    };

    const courseAStart = parseTime(courseA.starting);
    const courseAEnd = parseTime(courseA.ending);
    const courseBStart = parseTime(courseB.starting);
    const courseBEnd = parseTime(courseB.ending);

    // console.log(courseAStart, courseAEnd, courseBStart, courseBEnd);

    return (
      courseA.days.some((dayA) => courseB.days.includes(dayA)) &&
      ((courseAStart >= courseBStart && courseAStart < courseBEnd) ||
        (courseBStart >= courseAStart && courseBStart < courseAEnd))
    );
  }

  const sortedCourses: Course[] = [...courses].sort((a, b) =>
    a.starting.localeCompare(b.starting)
  );

  const allScheduleCombinations: Course[][] = [];
  const uniqueCourseCodes: Set<string> = new Set();

  function exploreSchedules(currentIndex: number, currentSchedule: Course[]) {
    if (currentIndex >= sortedCourses.length) {
      if (currentSchedule.length >= minCoursesCount) {
        allScheduleCombinations.push([...currentSchedule]);
      }
      return;
    }

    const course: Course = sortedCourses[currentIndex];
    const hasConflict: boolean = currentSchedule.some((scheduledCourse) =>
      hasTimeConflict(course, scheduledCourse)
    );

    // console.log(course, hasConflict);

    if (!hasConflict && !uniqueCourseCodes.has(course.courseCode)) {
      currentSchedule.push(course);
      uniqueCourseCodes.add(course.courseCode);

      exploreSchedules(currentIndex + 1, currentSchedule);

      currentSchedule.pop();
      uniqueCourseCodes.delete(course.courseCode);
    }

    exploreSchedules(currentIndex + 1, currentSchedule);
  }

  exploreSchedules(0, []);

  // Sort schedules in descending order based on the number of courses
  allScheduleCombinations.sort((a, b) => b.length - a.length);

  const withoutSubsets: Course[][] = removeSubsets(allScheduleCombinations);

  return sortCombinationsByCreditHours(withoutSubsets);
}

function removeSubsets(scheduleCombinations: Course[][]): Course[][] {
  const nonSubsets: Course[][] = [];

  for (const combination of scheduleCombinations) {
    let isSubset: boolean = false;

    for (const existingCombination of nonSubsets) {
      if (
        combination.every((courseA) =>
          existingCombination.some(
            (courseB) =>
              courseA.courseCode === courseB.courseCode &&
              courseA.group === courseB.group
          )
        )
      ) {
        isSubset = true;
        break;
      }
    }

    if (!isSubset) {
      nonSubsets.push(combination);
    }
  }

  return nonSubsets;
}

// Add type definition for sortCombinationsByCreditHours if not defined
function sortCombinationsByCreditHours(combinations: Course[][]): Course[][] {
  // Add sorting logic based on credit hours if needed
  return combinations;
}

export { findAllScheduleCombinations };
