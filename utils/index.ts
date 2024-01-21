import { Course } from "@prisma/client";

function findAllScheduleCombinations(
  courses: Course[],
  { minCoursesCount = 0 }: { minCoursesCount?: number } = {}
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

  // return allScheduleCombinations;

  const withoutSubsets: Course[][] = removeSubsets(allScheduleCombinations);

  return sortCombinationsByCreditHours(withoutSubsets);
}

type Combination = Course[];

function checkIsSubset(
  currentCombination: Combination,
  existingCombination: Combination
): boolean {
  const subsetCourses: Course[] = [];

  const isSubset = currentCombination.every((currentCourse) => {
    const matchingCourse = existingCombination.find(
      (existingCourse) =>
        (currentCourse.courseCode === existingCourse.courseCode &&
        currentCourse.group === existingCourse.group)
    );

    if (!matchingCourse) {
      return false;
    }

    subsetCourses.push(matchingCourse);
    return true;
  });

  if (isSubset) {
    console.log("Subset Detected:");
    console.log("Current Combination:", currentCombination);
    console.log("Courses causing subset:", subsetCourses);
    console.log("Existing Combination (Superset):", existingCombination);
  }

  return isSubset;
}

function removeSubsets(combinations: Combination[]): Combination[] {
  const uniqueCombinations: Combination[] = [];

  combinations.forEach((currentCombination) => {
    // Check if the current combination is a subset of any existing combination
    const isSubset = uniqueCombinations.some((existingCombination) =>
      checkIsSubset(currentCombination, existingCombination)
    );

    // If not a subset, add it to the unique combinations array
    if (!isSubset) {
      uniqueCombinations.push(currentCombination);
    }
  });

  return uniqueCombinations;
}

// Add type definition for sortCombinationsByCreditHours if not defined
function sortCombinationsByCreditHours(combinations: Course[][]): Course[][] {
  // Add sorting logic based on credit hours if needed
  return combinations;
}

export { findAllScheduleCombinations };
