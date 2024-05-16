"use client";

import { FC, useEffect, useState } from "react";
import { AnimatePresence, useAnimate, motion } from "framer-motion";
import classNames from "classnames";

import STYLE from "./timer.module.scss";

function getLimitTime(diff: number) {
  if (diff < 0) return null;

  let day = Math.floor(diff / (1000 * 60 * 60 * 24)).toString();
  let hour = Math.floor((diff / (1000 * 60 * 60)) % 24).toString();
  let minute = Math.floor((diff / (1000 * 60)) % 60).toString();
  let second = Math.floor((diff / 1000) % 60).toString();

  if (day.length === 1) {
    day = `0${day}`;
  }
  if (hour.length === 1) {
    hour = `0${hour}`;
  }
  if (minute.length === 1) {
    minute = `0${minute}`;
  }
  if (second.length === 1) {
    second = `0${second}`;
  }

  return { day, hour, minute, second };
}

interface TimerLimitProps {
  currentTime: number;
  endTime: number;

  fontSize?: string;
  maxLength?: number;
  styleDisabled?: boolean;
  onLimit?: VoidFunction;
}

/**
 * @maxLength default 7 !!x일 xx시 xx분 xx초, !!Maximum 8
 */

const TimerLimit: FC<TimerLimitProps> = ({
  currentTime,
  endTime,

  fontSize = "20px",
  maxLength = 7,
  styleDisabled = false,
  onLimit,
}) => {
  const [limitTime, setLimitTime] = useState<number>();

  const timeFormat =
    typeof limitTime === "number" ? getLimitTime(limitTime) : null;
  const prevTimeFormat =
    typeof limitTime === "number" ? getLimitTime(limitTime + 1000) : null;

  const [secondFirstScope, animateSecondFirstScope] = useAnimate();
  const [secondLastScope, animateSecondLastScope] = useAnimate();

  const [minuteFirstScope, animateMinuteFirstScope] = useAnimate();
  const [minuteLastScope, animateMinuteLastScope] = useAnimate();

  const [hourFirstScope, animateHourFirstScope] = useAnimate();
  const [hourLastScope, animateHourLastScope] = useAnimate();

  const [dayFirstScope, animateDayFirstScope] = useAnimate();
  const [dayLastScope, animateDayLastScope] = useAnimate();

  useEffect(() => {
    setLimitTime(endTime - currentTime);
  }, [endTime, currentTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLimitTime((prev) =>
        typeof prev === "number" ? prev - 1000 : undefined
      );
    }, 1000);

    if (!timeFormat && !prevTimeFormat) {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [prevTimeFormat, timeFormat]);

  useEffect(() => {
    if (!timeFormat && typeof limitTime === "number") {
      onLimit?.();
    }
  }, [limitTime, onLimit, timeFormat]);

  useEffect(() => {
    if (!timeFormat || !prevTimeFormat || typeof limitTime === "undefined")
      return;

    const exitVariants = {
      opacity: [1, 1, 1, 1, 0],
      y: [0, 0, 0, 0, 10],
    };

    const initVariants = {
      opacity: [0, 1, 1, 1, 1],
      y: [-10, 0, 0, 0, 0],
    };

    if (prevTimeFormat.second.slice(1, 2) !== timeFormat.second.slice(1, 2)) {
      animateSecondLastScope(
        secondLastScope.current,
        {
          opacity: [0, 1, 1, 1, 0],
          y: [-10, 0, 0, 0, 10],
        },
        {
          duration: 1,
        }
      );

      if (timeFormat.second.slice(1, 2) === "0") {
        animateSecondFirstScope(secondFirstScope.current, exitVariants, {
          duration: 1,
        });

        if (timeFormat.second.slice(0, 1) === "0") {
          animateMinuteLastScope(minuteLastScope.current, exitVariants, {
            duration: 1,
          });

          if (timeFormat.minute.slice(1, 2) === "0") {
            animateMinuteFirstScope(minuteFirstScope.current, exitVariants, {
              duration: 1,
            });

            if (timeFormat.minute.slice(0, 1) === "0") {
              animateHourLastScope(hourLastScope.current, exitVariants, {
                duration: 1,
              });

              if (timeFormat.hour.slice(1, 2) === "0") {
                animateHourFirstScope(hourFirstScope.current, exitVariants, {
                  duration: 1,
                });

                if (timeFormat.hour.slice(0, 1) === "0") {
                  animateDayLastScope(dayLastScope.current, exitVariants, {
                    duration: 1,
                  });

                  if (timeFormat.day.slice(1, 2) === "0") {
                    animateDayFirstScope(dayFirstScope.current, exitVariants, {
                      duration: 1,
                    });
                  }
                }
              }
            }
          }
        }
      }
    }

    if (prevTimeFormat.second.slice(0, 1) !== timeFormat.second.slice(0, 1)) {
      animateSecondFirstScope(secondFirstScope.current, initVariants, {
        duration: 1,
      });
    }

    if (prevTimeFormat.minute.slice(1, 2) !== timeFormat.minute.slice(1, 2)) {
      animateMinuteLastScope(minuteLastScope.current, initVariants, {
        duration: 1,
      });
    }

    if (prevTimeFormat.minute.slice(0, 1) !== timeFormat.minute.slice(0, 1)) {
      animateMinuteFirstScope(minuteFirstScope.current, initVariants, {
        duration: 1,
      });
    }

    if (prevTimeFormat.hour.slice(1, 2) !== timeFormat.hour.slice(1, 2)) {
      animateHourLastScope(hourLastScope.current, initVariants, {
        duration: 1,
      });
    }

    if (prevTimeFormat.hour.slice(0, 1) !== timeFormat.hour.slice(0, 1)) {
      animateHourFirstScope(hourFirstScope.current, initVariants, {
        duration: 1,
      });
    }

    if (prevTimeFormat.day.slice(1, 2) !== timeFormat.day.slice(1, 2)) {
      animateDayLastScope(dayLastScope.current, initVariants, {
        duration: 1,
      });
    }

    if (prevTimeFormat.day.slice(0, 1) !== timeFormat.day.slice(0, 1)) {
      animateDayFirstScope(dayFirstScope.current, initVariants, {
        duration: 1,
      });
    }
  }, [
    animateDayFirstScope,
    animateDayLastScope,
    animateHourFirstScope,
    animateHourLastScope,
    animateMinuteFirstScope,
    animateMinuteLastScope,
    animateSecondFirstScope,
    animateSecondLastScope,
    dayFirstScope,
    dayLastScope,
    hourFirstScope,
    hourLastScope,
    limitTime,
    minuteFirstScope,
    minuteLastScope,
    prevTimeFormat,
    secondFirstScope,
    secondLastScope,
    timeFormat,
  ]);

  return (
    <AnimatePresence>
      {timeFormat && prevTimeFormat && typeof limitTime === "number" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: [0, 10],
          }}
          className={classNames({
            [STYLE.__timer_limit_container]: true,
            [STYLE.__timer_limit_container_style]: !styleDisabled,
          })}
          style={{
            fontSize,
          }}
        >
          <div
            style={{
              display: maxLength > 6 ? "flex" : "none",
            }}
          >
            <div
              ref={dayFirstScope}
              style={{
                display: maxLength > 7 ? "flex" : "none",
                justifyContent: "center",
                width: `calc(${fontSize} - ${fontSize} / 2 )`,
              }}
            >
              {timeFormat.day.slice(0, 1)}
            </div>
            <div
              ref={dayLastScope}
              style={{
                display: "flex",
                justifyContent: "center",
                width: `calc(${fontSize} - ${fontSize} / 2 )`,
              }}
            >
              {timeFormat.day.slice(1, 2)}
            </div>
            일
          </div>

          <div
            style={{
              display: maxLength > 4 ? "flex" : "none",
            }}
          >
            <div
              ref={hourFirstScope}
              style={{
                display: maxLength > 5 ? "flex" : "none",
                justifyContent: "center",
                width: `calc(${fontSize} - ${fontSize} / 2 )`,
              }}
            >
              {timeFormat.hour.slice(0, 1)}
            </div>
            <div
              ref={hourLastScope}
              style={{
                display: "flex",
                justifyContent: "center",
                width: `calc(${fontSize} - ${fontSize} / 2 )`,
              }}
            >
              {timeFormat.hour.slice(1, 2)}
            </div>
            시간
          </div>

          <div
            style={{
              display: maxLength > 2 ? "flex" : "none",
            }}
          >
            <div
              ref={minuteFirstScope}
              style={{
                display: maxLength > 3 ? "flex" : "none",
                justifyContent: "center",
                width: `calc(${fontSize} - ${fontSize} / 2 )`,
              }}
            >
              {timeFormat.minute.slice(0, 1)}
            </div>
            <div
              ref={minuteLastScope}
              style={{
                display: "flex",
                justifyContent: "center",
                width: `calc(${fontSize} - ${fontSize} / 2 )`,
              }}
            >
              {timeFormat.minute.slice(1, 2)}
            </div>
            분
          </div>

          <div style={{ display: "flex" }}>
            <div
              ref={secondFirstScope}
              style={{
                display: maxLength > 1 ? "flex" : "none",
                justifyContent: "center",
                width: `calc(${fontSize} - ${fontSize} / 2 )`,
              }}
            >
              {timeFormat.second.slice(0, 1)}
            </div>
            <div
              ref={secondLastScope}
              style={{
                display: "flex",
                justifyContent: "center",
                width: `calc(${fontSize} - ${fontSize} / 2 )`,
              }}
            >
              {timeFormat.second.slice(1, 2)}
            </div>
            초
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TimerLimit;
