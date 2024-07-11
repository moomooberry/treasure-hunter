"use client";

import { useCallback, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";

import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";
import getTreasure from "@src/api/treasure/getTreasure";
import TimerLimit from "@src/components/timer/TimerLimit";

import STYLE from "../treasure.detail.module.scss";

const TreasureDetailTimerLimit = () => {
  const [isLimit, setIsLimit] = useState(false);

  const { treasure_id } = useParams();

  const currentTime = useMemo(() => dayjs().valueOf(), []);

  const { data } = useQuery({
    queryKey: [API_GET_TREASURE_KEY, { treasure_id }],
    queryFn: () => getTreasure({ treasure_id: treasure_id as string }),
  });

  const onLimit = useCallback(() => {
    setIsLimit(true);
  }, []);

  return (
    data && (
      <AnimatePresence>
        {isLimit ? (
          <motion.div
            className={STYLE.__treasure_detail_timer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            보물 유효기간이 지났어요.
          </motion.div>
        ) : (
          <>
            <TimerLimit
              currentTime={currentTime}
              endTime={data.end_date}
              fontSize="18px"
              maxLength={7}
              styleDisabled
              onLimit={onLimit}
            >
              남았어요.
            </TimerLimit>
          </>
        )}
      </AnimatePresence>
    )
  );
};

export default TreasureDetailTimerLimit;
