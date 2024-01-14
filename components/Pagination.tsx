import Link from "next/link";
import React from "react";

type searchParam = {
  //   how to represent  {exam: "final", day: "monday"}?
  [searchParam: string]: string;
};

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  searchParams?: searchParam[];
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
  const generatePageLinks = () => {
    const pageLinks = [];
    const maxLinks = 10;
    const sideLinks = 5;
    let pageRanges = [];

    // Generate the first set of pages
    for (let page = 1; page <= Math.min(sideLinks, totalPages); page++) {
      pageRanges.push(page);
    }

    // Add the ellipsis (...) if there are more pages to display
    if (totalPages > maxLinks) {
      pageRanges.push(null);
    }

    // Generate the last set of pages
    for (
      let page = Math.max(totalPages - sideLinks + 1, sideLinks + 1);
      page <= totalPages;
      page++
    ) {
      pageRanges.push(page);
    }

    for (const page of pageRanges) {
      if (page === null) {
        // Display ellipsis (...) instead of individual links
        // pageLinks.push(
        //   <li key="ellipsis">
        //     <span>...</span>
        //   </li>
        // );
      } else {
        const isCurrentPage = page === currentPage;
        const linkClass = `flex items-center justify-center px-4 h-10 leading-tight ${
          isCurrentPage
            ? "text-emerald-600 border bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-700 dark:bg-gray-700 dark:text-white"
            : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        }`;

        pageLinks.push(
          <li key={page}>
            <Link
              href={`?page=${page}`}
              className={linkClass}
              aria-current={isCurrentPage ? "page" : undefined}
            >
              {isCurrentPage ? page : page}
            </Link>
          </li>
        );
      }
    }

    return pageLinks;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li>
          {/* make it span if disables */}
          <Link
            style={{ pointerEvents: currentPage === 1 ? "none" : "auto" }}
            aria-disabled={currentPage === 1}
            href={`?page=${currentPage - 1}`}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </Link>
        </li>
        {generatePageLinks()}
        <li>
          <Link
            style={{
              pointerEvents: currentPage === totalPages ? "none" : "auto",
            }}
            aria-disabled={currentPage === totalPages}
            href={`?page=${currentPage + 1}`}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
