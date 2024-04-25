import googleMapLoader from "@src/libs/google-map";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import treasureImgSrc from "@src/assets/webp/treasure_512_512.webp";

// TODO 데이터 만들면 타입 지정하기
interface IData {
  id: number;
  position: { lat: number; lng: number };
  imgSrc: string;
  title: string;
  hint: string;
  endDate: number;
  reward: number;
}

interface UseTreasureMapProps {
  view: {
    mode: "view";
    bufferRadius: number;
  };
  add: {
    mode: "add";
    bufferRadius: number;
  };
  edit: {
    mode: "edit";
    id: number;
  };
}

interface UseTreasureMapReturn {
  view: {
    ref: RefObject<HTMLDivElement>;
    selectedTreasure: IData | null;
  };
  add: {
    ref: RefObject<HTMLDivElement>;
    treasurePosition: IData["position"];
    error: {
      isOverBuffer: boolean;
    };
    clearError: (value: keyof UseTreasureMapReturn["add"]["error"]) => void;
  };
  edit: {
    ref: RefObject<HTMLDivElement>;
    editedTreasure: IData | null;
  };
}

type UseTreasureMapUnionProps =
  | UseTreasureMapProps["view"]
  | UseTreasureMapProps["add"]
  | UseTreasureMapProps["edit"];

function useTreasureMap({
  mode,
  bufferRadius,
}: UseTreasureMapProps["view"]): UseTreasureMapReturn["view"];

function useTreasureMap({
  mode,
  bufferRadius,
}: UseTreasureMapProps["add"]): UseTreasureMapReturn["add"];

function useTreasureMap({
  mode,
  id,
}: UseTreasureMapProps["edit"]): UseTreasureMapReturn["edit"];

function useTreasureMap(originalProps: UseTreasureMapUnionProps): unknown {
  const ref = useRef<HTMLDivElement>(null);

  // view
  const [selectedTreasure, setSelectedTreasure] = useState<IData | null>(null);

  // add
  const [treasurePosition, setTreasurePosition] = useState<
    IData["position"] | null
  >(null);

  const [error, setError] = useState<UseTreasureMapReturn["add"]["error"]>({
    isOverBuffer: false,
  });

  const clearError: UseTreasureMapReturn["add"]["clearError"] = useCallback(
    (value) => {
      setError((prev) => {
        if (!prev[value]) return prev;

        const result = prev;
        result[value] = false;
        return result;
      });
    },
    []
  );

  // edit
  const [editedTreasure, setEditedTreasure] = useState<IData | null>(null);

  // private
  const [props] = useState(originalProps);

  const handleSelectedTreasure = useCallback((value: IData | null) => {
    const handler = () => {
      setSelectedTreasure(value);
    };
    return handler;
  }, []);

  useEffect(() => {
    // TODO 네이티브에서 권한 받기
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { longitude: lng, latitude: lat } }) => {
        if (!ref.current) return;

        /* CONFIG_COMMON */
        const { Map, Circle } = await googleMapLoader.importLibrary("maps");

        const { AdvancedMarkerElement, PinElement } =
          await googleMapLoader.importLibrary("marker");

        const map = new Map(ref.current, {
          zoom: props.mode === "view" ? 18 : 20,
          minZoom: props.mode === "view" ? 13 : 19,
          center: { lat, lng },
          clickableIcons: false,
          disableDoubleClickZoom: true,
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
          mapTypeControl: false,
          zoomControl: false,
          fullscreenControl: false,
        });

        const myPin = document.createElement("div");
        myPin.style.width = "30px";
        myPin.style.height = "30px";
        myPin.style.transform = "translate(0, 15px)";
        myPin.style.borderRadius = "50%";
        myPin.style.backgroundColor = "gray";

        new AdvancedMarkerElement({
          map,
          position: { lat, lng },
          content: myPin,
        });

        /* CONFIG_VIEW */
        if (props.mode === "view") {
          const buffer = new Circle({
            map,
            strokeColor: "#0984e3",
            strokeOpacity: 0.5,
            strokeWeight: 1,
            fillColor: "#0984e3",
            fillOpacity: 0.15,
            center: { lat, lng },
            radius: props.bufferRadius,
          });
          // TODO data-list
          const data: IData[] = [
            {
              id: 1,
              position: { lat: lat + 0.001, lng: lng + 0.001 },
              endDate: 123,
              hint: "힌트입니다.",
              imgSrc: "asd",
              reward: 10000,
              title: "타이틀입니다",
            },
            {
              id: 2,
              position: { lat: lat - 0.001, lng: lng - 0.001 },
              endDate: 123,
              hint: "힌트입니다.",
              imgSrc: "asd",
              reward: 10000,
              title: "타이틀입니다",
            },
            {
              id: 3,
              position: { lat: lat + 0.0005, lng: lng - 0.0003 },
              endDate: 123,
              hint: "힌트입니다.",
              imgSrc: "asd",
              reward: 10000,
              title: "타이틀입니다",
            },
          ];

          data.forEach((item) => {
            const image = document.createElement("img");
            image.src = treasureImgSrc.src;
            image.style.width = "70%";
            image.style.height = "70%";
            const treasure = document.createElement("div");
            treasure.style.width = "40px";
            treasure.style.minWidth = "40px";
            treasure.style.height = "40px";
            treasure.style.backgroundColor = "#fff";
            treasure.style.borderRadius = "50%";
            treasure.style.display = "flex";
            treasure.style.justifyContent = "center";
            treasure.style.alignItems = "center";
            treasure.appendChild(image);

            const pin = new PinElement({
              scale: 2,
              background: "#ffeaa7",
              borderColor: "#ffeaa7",
              glyph: treasure,
            });

            const marker = new AdvancedMarkerElement({
              map,
              position: item.position,
              content: pin.element,
            });

            marker.addListener("click", handleSelectedTreasure(item));
          });

          buffer.addListener("click", handleSelectedTreasure(null));
          map.addListener("click", handleSelectedTreasure(null));
        }

        /* CONFIG_ADD */
        if (props.mode === "add") {
          const buffer = new Circle({
            map,
            strokeColor: "#0984e3",
            strokeOpacity: 0.5,
            strokeWeight: 1,
            fillColor: "#0984e3",
            fillOpacity: 0.15,
            center: { lat, lng },
            radius: props.bufferRadius,
          });

          const image = document.createElement("img");
          image.src = treasureImgSrc.src;
          image.style.width = "70%";
          image.style.height = "70%";
          const treasure = document.createElement("div");
          treasure.style.width = "40px";
          treasure.style.minWidth = "40px";
          treasure.style.height = "40px";
          treasure.style.backgroundColor = "#fff";
          treasure.style.borderRadius = "50%";
          treasure.style.display = "flex";
          treasure.style.justifyContent = "center";
          treasure.style.alignItems = "center";
          treasure.appendChild(image);

          const pin = new PinElement({
            scale: 2,
            background: "#d63031",
            borderColor: "#d63031",
            glyph: treasure,
          });

          const marker = new AdvancedMarkerElement({
            map,
            position: { lat, lng },
            gmpClickable: true,
            gmpDraggable: true,
            content: pin.element,
          });

          const position = marker.position as google.maps.LatLngLiteral;
          setTreasurePosition({ lat: position.lat, lng: position.lng });

          marker.addListener("dragend", () => {
            const newPosition = marker.position as google.maps.LatLngLiteral;
            setTreasurePosition({ lat: newPosition.lat, lng: newPosition.lng });

            const DISTANCE_PER_LATITUDE = 111000;
            const DISTANCE_PER_LONGITUDE =
              111000 * Math.cos((lat * Math.PI) / 180);

            const isOverBuffer =
              Math.pow((newPosition.lat - lat) * DISTANCE_PER_LATITUDE, 2) +
                Math.pow((newPosition.lng - lng) * DISTANCE_PER_LONGITUDE, 2) >=
              Math.pow(props.bufferRadius, 2);

            if (isOverBuffer) {
              setError({ isOverBuffer: true });
            } else {
              setError({ isOverBuffer: false });
            }
          });
        }

        if (props.mode === "edit") {
          // TODO detail data
          const { id } = props;

          const data: IData = {
            id: 1,
            position: { lat: lat + 0.001, lng: lng + 0.001 },
            endDate: 123,
            hint: "힌트입니다.",
            imgSrc: "asd",
            reward: 10000,
            title: "타이틀입니다",
          };

          const image = document.createElement("img");
          image.src = treasureImgSrc.src;
          image.style.width = "70%";
          image.style.height = "70%";
          const treasure = document.createElement("div");
          treasure.style.width = "40px";
          treasure.style.minWidth = "40px";
          treasure.style.height = "40px";
          treasure.style.backgroundColor = "#fff";
          treasure.style.borderRadius = "50%";
          treasure.style.display = "flex";
          treasure.style.justifyContent = "center";
          treasure.style.alignItems = "center";
          treasure.appendChild(image);

          const pin = new PinElement({
            scale: 2,
            background: "#0984e3",
            borderColor: "#0984e3",
            glyph: treasure,
          });

          const marker = new AdvancedMarkerElement({
            map,
            position: data.position,
            content: pin.element,
          });

          map.setCenter(data.position);
          setEditedTreasure(data);
        }
      },
      () => {
        // TODO 위치권한 받는 네이티브 브릿지 호출 해야함
      }
    );

    return () => {
      // remove event
    };
  }, [handleSelectedTreasure, props]);

  if (props.mode === "view") return { ref, selectedTreasure };

  if (props.mode === "add") return { ref, treasurePosition, error, clearError };

  if (props.mode === "edit") return { ref, editedTreasure };
}

export default useTreasureMap;
