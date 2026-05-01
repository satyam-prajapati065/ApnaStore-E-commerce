import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import React, { useState } from "react";

function ScrollLeftRight({ scrollRef, heading, title, func }) {
  const [timer, setTimer] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [timerStatus, setTimerStatus] = useState(true);

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

  function timerCountDown() {
    const countDownDate = new Date("April 23, 2026 00:00:00").getTime();

    const x = setInterval(function () {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimer({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
      if (distance < 0) {
        clearInterval(x);
        setTimerStatus(false);
      }
    }, 1000);
  }
  timerCountDown();
  return (
    <>
      <div className="related-items-box">
        <div className="rect"></div>
        <h3>{heading}</h3>
      </div>
      <div className="heading-and-btn">
        <h1>{title}</h1>
        {func ? (
          timerStatus ? (
            <div className="sale-container">
              <div className="time-boxes">
                <span className="time-title">Days</span>
                <span className="time">{timer.days}</span>
              </div>
              <p className="timer-dot">:</p>
              <div className="time-boxes">
                <span className="time-title">Hours</span>
                <span className="time">{timer.hours}</span>
              </div>
              <p className="timer-dot">:</p>
              <div className="time-boxes">
                <span className="time-title">Minutes</span>
                <span className="time">{timer.minutes}</span>
              </div>
              <p className="timer-dot">:</p>
              <div className="time-boxes">
                <span className="time-title">Seconds</span>
                <span className="time">{timer.seconds}</span>
              </div>
            </div>
          ) : (
            <div className="sale-live">
              <span>Sale is Live</span>
            </div>
          )
        ) : (
          ""
        )}
        <div className="left-right-toggle">
          <button onClick={() => scroll("left")}>
            <ArrowLeftIcon />
          </button>
          <button onClick={() => scroll("right")}>
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export default ScrollLeftRight;
