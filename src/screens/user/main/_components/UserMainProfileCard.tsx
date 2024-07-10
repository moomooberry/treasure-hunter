"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import Avatar from "@src/components/avatar/Avatar";
import getUser from "@src/api/user/getUser";
import QualificationLevelIcon from "@src/components/icons/QualificationLevelIcon";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";

import STYLE from "../user.main.module.scss";

function getLevel(value: number) {
  if (value >= 30) return "LEVEL3";
  if (value >= 10) return "LEVEL2";
  if (value >= 5) return "LEVEL1";
  return "LEVEL0";
}

function getProficiency(value: number) {
  if (value >= 30) return "1급";
  if (value >= 10) return "2급";
  if (value >= 5) return "3급";
  return "견습";
}

const UserMainProfileCard: FC = () => {
  const { data } = useQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

  return (
    data && (
      <motion.div
        initial={{
          opacity: 0,
          x: -30,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: 0.3,
        }}
        className={STYLE.__card_container}
      >
        <div className={STYLE.__card_info_box}>
          <Avatar imageSrc={data.profile_image} />

          <div className={STYLE.__card_info_wrapper}>
            <div className={STYLE.__card_info_username}>{data.username}</div>

            <div className={STYLE.__card_info_qualification_wrapper}>
              <QualificationLevelIcon
                level={getLevel(data.hiding_count)}
                width="12px"
                height="12px"
              />
              <span className={STYLE.__card_info_qualification}>
                {getProficiency(data.hiding_count)} 하이더
              </span>
            </div>

            <div className={STYLE.__card_info_qualification_wrapper}>
              <QualificationLevelIcon
                level={getLevel(data.seeking_count)}
                width="12px"
                height="12px"
              />
              <span className={STYLE.__card_info_qualification}>
                {getProficiency(data.seeking_count)} 보물헌터
              </span>
            </div>
          </div>
        </div>

        <div className={STYLE.__card_treasure_box}>
          <div className={STYLE.__card_treasure_wrapper}>
            <span className={STYLE.__card_treasure_title}>찾은 보물</span>
            <span className={STYLE.__card_treasure_count}>
              {data.seeking_count}
            </span>
          </div>

          <div className={STYLE.__card_treasure_wrapper}>
            <span className={STYLE.__card_treasure_title}>숨긴 보물</span>
            <span className={STYLE.__card_treasure_count}>
              {data.hiding_count}
            </span>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default UserMainProfileCard;
