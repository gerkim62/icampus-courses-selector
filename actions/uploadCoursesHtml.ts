import { Course, Day } from "@prisma/client";
import prisma from "@/libs/prisma";

// @ts-expect-error
import HtmlTableToJson from "html-table-to-json";
import { redirect } from "next/navigation";

const expectedHeader = [
  "Starting",
  "Ending",
  "Days",
  "Course Code",
  "Course Title",
  "Instructor",
  "Group",
  "Room",
];

async function uploadCoursesHtml(formdata: FormData) {
  let success = false;
  try {
    const htmlFile = formdata.get("htmlFile");

    console.log(htmlFile);

    if (!htmlFile) {
      throw new Error("htmlFile is missing");
    }

    if (!(htmlFile instanceof File)) {
      throw new Error("htmlFile is not a file");
    }

    //does it end in .html or .htm?
    const filename = htmlFile.name.toLowerCase();
    if (!filename.endsWith(".html") && !filename.endsWith(".htm")) {
      throw new Error("htmlFile is not a .html or .htm file");
    }

    const html = await htmlFile.text();

    if (!html) {
      throw new Error("htmlFile is empty");
    }

    const json = HtmlTableToJson.parse(html);

    const headers = json.headers[0];

    //check if headers are correct and log the missing ones
    const missingHeaders = expectedHeader.filter(
      (header) => !headers.includes(header)
    );

    if (missingHeaders.length > 0) {
      throw new Error(
        `The first table is missing the following headers: ${missingHeaders.join(
          ", "
        )}`
      );
    }

    type RawCourse = {
      Starting: string;
      Ending: string;
      Days: string;
      "Course Code": string;
      "Course Title": string;
      Instructor: string;
      Group: string;
      Room: string;
    };

    const tables = json.results;
    const rawCourses: RawCourse[] = tables.flat();

    const courses: Omit<Course, "id" | "courseListId">[] = rawCourses.map(
      (rawCourse: RawCourse) => {
        const allowedDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
        const sanitizedDays = rawCourse["Days"]
          .split(",")
          .map((day) => day.trim())
          .filter((day) => allowedDays.includes(day.toLowerCase())) as Day[];

        const course: Omit<Course, "id" | "courseListId"> = {
          starting: rawCourse["Starting"],
          ending: rawCourse["Ending"],
          days: sanitizedDays,
          courseCode: rawCourse["Course Code"],
          courseTitle: rawCourse["Course Title"],
          instructor: rawCourse["Instructor"],
          group: rawCourse["Group"],
          room: rawCourse["Room"],
        };
        return course;
      }
    );

    // console.log(courses);
    const batchSizes = 50;
    const batches = [];

    // Create batches
    for (let i = 0; i < courses.length; i += batchSizes) {
      batches.push(courses.slice(i, i + batchSizes));
    }

    try {
      console.log("saving courses");

      // remove all courses
      await prisma.course.deleteMany();
      console.log("deleted courses")
      // remove all schedules
      await prisma.schedule.deleteMany();
      console.log("deleted schedules")

      console.log("creating schedule new...")

      // Create schedule
      const schedule = await prisma.schedule.create({
        data: {
          name: "test",
        },
      });

      // Add courses in batches
      for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
        const batch = batches[batchIndex];

        console.log(`Processing batch ${batchIndex + 1}/${batches.length}`);

        await prisma.schedule.update({
          where: { id: schedule.id },
          data: {
            courses: {
              create: batch,
            },
          },
        });

        console.log(`Batch ${batchIndex + 1} processed successfully.`);
      }

      console.log("saved courses");
      success = true;
    } catch (error) {
      console.log("error saving courses");
      const message =
        error instanceof Error ? error.message : JSON.stringify(error);
      throw new Error(`Error while saving courses: ${message}`);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : JSON.stringify(error);
    redirect("?error=" + encodeURIComponent(message));
  } finally {
    if (success) redirect("?success=" + encodeURIComponent(success.toString()));
  }
}

export default uploadCoursesHtml;
