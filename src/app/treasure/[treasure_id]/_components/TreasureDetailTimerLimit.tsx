"use client";

import { FC, useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";

import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";
import getTreasure from "@src/api/treasure/getTreasure";

const TimerLimit = dynamic(() => import("@src/components/timer/TimerLimit"), {
  ssr: false,
  loading: () => <span>보물 유효기간 계산중</span>,
});

const TreasureDetailTimerLimit: FC = () => {
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
