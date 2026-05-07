import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import React from "react";

function ScrollLeftRight({
  scrollRef,
  heading,
  title,
  page,
  setPage,
  totalPages,
}) {
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth - 204
          : scrollLeft + clientWidth - 204;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }

    if (direction === "right" && page < totalPages) {
      setPage(page + 1);
    }

    if (direction === "left" && page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <div className="related-items-box">
        <div className="rect"></div>
        <span>{heading}</span>
      </div>

      <div className="heading-and-btn">
        <span>{title}</span>

        <div className="left-right-toggle">
          <button onClick={() => scroll("left")} disabled={page === 1}>
            <ArrowLeftIcon />
          </button>

          <button onClick={() => scroll("right")}>
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScrollLeftRight;
