import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import React from "react";

function ScrollLeftRight({ scrollRef, heading, title }) {
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth - 204
          : scrollLeft + clientWidth - 204;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
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
          <button onClick={() => scroll("left")}>
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
