import { Loader } from "@googlemaps/js-api-loader";
import { Position } from "@src/types/position";
import treasureImgSrc from "@src/assets/webp/treasure_512_512.webp";
import { TreasureItem } from "@src/types/treasure";

interface Error {
  isOverBuffer: boolean;
}

interface InitViewProps {
  mode: "view";
  bufferRadius: number;
  position: Position;
}

interface InitAddProps {
  mode: "add";
  bufferRadius: number;
  position: Position;
}

interface InitEditProps {
  mode: "edit";
  position: Position;
}

type InitProps = InitViewProps | InitAddProps | InitEditProps;

export class TreasureMap {
  /* COMMON */
  private _mapsLibrary: google.maps.MapsLibrary | null = null;
  private _markerLibrary: google.maps.MarkerLibrary | null = null;
  private _map: google.maps.Map | null = null;
  private _element: HTMLDivElement | null = null;

  private _user: google.maps.marker.AdvancedMarkerElement | null = null;
  private _userBuffer: google.maps.Circle | null = null;

  /* VIEW */
  private _selectedTreasure: TreasureItem | null = null;

  /* ADD */
  private _treasurePosition: {
    lat: TreasureItem["lat"];
    lng: TreasureItem["lng"];
  } | null = null;
  private _error: Error = { isOverBuffer: false };

  /* UTILITY */
  private _generateUserElement() {
    // TODO 유저 프로필사진
    const userPin = document.createElement("div");
    userPin.style.width = "30px";
    userPin.style.height = "30px";
    userPin.style.transform = "translate(0, 15px)";
    userPin.style.borderRadius = "50%";
    userPin.style.backgroundColor = "gray";

    return userPin;
  }

  private _generateTreasureElement() {
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

    return treasure;
  }

  constructor(element: HTMLDivElement) {
    this._element = element;
  }

  public async init(props: InitProps) {
    if (!this._element) return;

    const googleMapLoader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    const mapsLibrary = await googleMapLoader.importLibrary("maps");
    const markerLibrary = await googleMapLoader.importLibrary("marker");

    this._mapsLibrary = mapsLibrary;
    this._markerLibrary = markerLibrary;
    this._map = new mapsLibrary.Map(this._element, {
      zoom: props.mode === "view" ? 18 : 20,
      minZoom: props.mode === "view" ? 13 : 19,
      center: props.position,
      clickableIcons: false,
      disableDoubleClickZoom: true,
      mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
      mapTypeControl: false,
      zoomControl: false,
      fullscreenControl: false,
    });

    if (props.mode !== "edit") {
      const userPin = this._generateUserElement();

      this._user = new markerLibrary.AdvancedMarkerElement({
        map: this._map,
        position: props.position,
        content: userPin,
      });

      this._userBuffer = new mapsLibrary.Circle({
        map: this._map,
        strokeColor: "#0984e3",
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: "#0984e3",
        fillOpacity: 0.15,
        center: props.position,
        radius: props.bufferRadius,
      });
    }
  }

  public moveUser({ position }: { position: Position }) {
    if (!this._user) return;
    this._user.position = position;
  }

  public moveUserBuffer({ position }: { position: Position }) {
    if (!this._userBuffer) return;
    this._userBuffer.setCenter(position);
  }

  public moveMap({ position }: { position: Position }) {
    if (!this._map) return;
    this._map.setCenter(position);
  }

  public async loadTreasureList({
    data,
    onSelect,
  }: {
    data: TreasureItem[];
    onSelect: (value: TreasureItem | null) => void;
  }) {
    if (!this._markerLibrary || !this._map || !this._userBuffer || !this._map)
      return;

    const { PinElement, AdvancedMarkerElement } = this._markerLibrary;

    data.forEach((item) => {
      const treasure = this._generateTreasureElement();

      const pin = new PinElement({
        scale: 2,
        background: "#ffeaa7",
        borderColor: "#ffeaa7",
        glyph: treasure,
      });

      const marker = new AdvancedMarkerElement({
        map: this._map,
        position: { lat: item.lat, lng: item.lng },
        content: pin.element,
      });

      marker.addListener("click", () => {
        this._selectedTreasure = item;
        onSelect(this._selectedTreasure);
      });
    });

    this._userBuffer.addListener("click", () => {
      this._selectedTreasure = null;
      onSelect(null);
    });

    this._map.addListener("click", () => {
      this._selectedTreasure = null;
      onSelect(null);
    });
  }

  /* ADD */
  public generateTreasure({
    position,
    onPosition,
    onError,
  }: {
    position: Position;
    onPosition: (value: Position) => void;
    onError: (value: Error) => void;
  }) {
    if (!this._markerLibrary || !this._map || !this._userBuffer) return;

    const useBufferRadius = this._userBuffer.getRadius();

    const treasure = this._generateTreasureElement();

    const pin = new this._markerLibrary.PinElement({
      scale: 2,
      background: "#d63031",
      borderColor: "#d63031",
      glyph: treasure,
    });

    const marker = new this._markerLibrary.AdvancedMarkerElement({
      map: this._map,
      position,
      gmpClickable: true,
      gmpDraggable: true,
      content: pin.element,
    });

    this._treasurePosition = position;
    onPosition(this._treasurePosition);

    marker.addListener("dragend", () => {
      const newPosition = {
        lat: (marker.position as google.maps.LatLngLiteral).lat,
        lng: (marker.position as google.maps.LatLngLiteral).lng,
      };

      this._treasurePosition = newPosition;
      onPosition(this._treasurePosition);

      const DISTANCE_PER_LATITUDE = 111000;
      const DISTANCE_PER_LONGITUDE =
        111000 * Math.cos((position.lat * Math.PI) / 180);

      const isOverBuffer =
        Math.pow((newPosition.lat - position.lat) * DISTANCE_PER_LATITUDE, 2) +
          Math.pow(
            (newPosition.lng - position.lng) * DISTANCE_PER_LONGITUDE,
            2
          ) >=
        Math.pow(useBufferRadius, 2);

      if (isOverBuffer) {
        this._error = { isOverBuffer: true };
        onError(this._error);
      } else {
        if (this._error.isOverBuffer) {
          this._error = { isOverBuffer: false };
          onError(this._error);
        }
      }
    });
  }

  public loadTreasure({ data }: { data: TreasureItem }) {
    if (!this._markerLibrary || !this._map) return;

    const treasure = this._generateTreasureElement();

    const pin = new this._markerLibrary.PinElement({
      scale: 2,
      background: "#0984e3",
      borderColor: "#0984e3",
      glyph: treasure,
    });

    const marker = new this._markerLibrary.AdvancedMarkerElement({
      map: this._map,
      position: { lat: data.lat, lng: data.lng },
      content: pin.element,
    });
  }
}
