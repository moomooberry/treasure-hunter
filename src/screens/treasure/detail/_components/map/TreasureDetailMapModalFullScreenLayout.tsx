"use client";

import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import getTreasure from "@src/api/treasure/getTreasure";
import getUser from "@src/api/user/getUser";
import Button from "@src/components/button";
import CloseIcon from "@src/components/icons/CloseIcon";
import LayoutBody from "@src/components/layout/body";
import LayoutFooter from "@src/components/layout/footer";
import LayoutHeader from "@src/components/layout/header";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import { TreasureMap } from "@src/libs/google-map";
import useZustandPositionStore from "@src/hooks/zustand/useZustandPositionStore";

import STYLE from "./treasure.detail.map.module.scss";

interface TreasureDetailMapModalFullScreenLayoutProps {
  onBackClick: MouseEventHandler<HTMLButtonElement>;
}

const TreasureDetailMapModalFullScreenLayout: FC<
  TreasureDetailMapModalFullScreenLayoutProps
> = ({ onBackClick }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [treasureMap, setTreasureMap] = useState<TreasureMap>();

  const { position } = useZustandPositionStore();

  const { treasure_id } = useParams();

  const { data: userData } = useQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

  const { data: treasureData } = useQuery({
    queryKey: [API_GET_TREASURE_KEY, { treasure_id }],
    queryFn: () => getTreasure({ treasure_id: treasure_id as string }),
  });

  const onMyPositionClick = useCallback(() => {
    if (!treasureMap) return;

    treasureMap.moveMap({ position });
  }, [position, treasureMap]);

  const onTreasurePositionClick = useCallback(() => {
    if (!treasureMap || !treasureData) return;

    treasureMap.moveMap({
      position: { lat: treasureData.lat, lng: treasureData.lng },
    });
  }, [treasureData, treasureMap]);

  const init = useCallback(async () => {
    if (!ref.current || !treasureData) return;

    const map = new TreasureMap(ref.current);

    await map.init({
      position: { lat: treasureData.lat, lng: treasureData.lng },
      minZoom: 13,
      zoom: 18,
    });

    map.loadUser({
      position,
      image: userData?.profile_image ?? null,
    });

    map.loadBuffer({
      position,
      bufferRadius: 3000,
    });

    map.loadTreasureList({
      data: [treasureData],
      color: "#ffeaa7",
    });

    setTreasureMap(map);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treasureData, userData]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (!treasureMap) return;

    treasureMap.moveUser({ position });
    treasureMap.moveUserBuffer({ position });
  }, [treasureMap, position]);

  return (
    <>
      <LayoutHeader shadowDisabled backgroundColor="transparent">
        <LayoutHeader.Option.RoundButton onClick={onBackClick}>
          <CloseIcon width="16px" height="16px" />
        </LayoutHeader.Option.RoundButton>
      </LayoutHeader>

      <LayoutBody.RegulatedMaxHeight marginTop="0px" marginBottom="0px">
        <div ref={ref} className={STYLE.__map_full_screen} />
      </LayoutBody.RegulatedMaxHeight>

      <LayoutFooter backgroundColor="transparent" disabledShadow>
        <div className={STYLE.__map_full_screen_button_wrapper}>
          <Button
            width="calc(50vw - 16px)"
            variant="cancel"
            onClick={onMyPositionClick}
          >
            내 위치로
          </Button>
          <Button
            width="calc(50vw - 16px)"
            variant="common"
            onClick={onTreasurePositionClick}
          >
            보물 위치로
          </Button>
        </div>
      </LayoutFooter>
    </>
  );
};

export default TreasureDetailMapModalFullScreenLayout;
