import { useContext, useEffect, useState } from "react";

import { PositionStoreContext } from "@src/app/PositionProvider";
import { Position } from "@src/types/position";

/**
 * @description Returns a zustandPosition value that is updated periodically
 * when the component that calls this hook is mounted. */

function useInitialPosition() {
  const store = useContext(PositionStoreContext);

  const [position, setPosition] = useState<Position>();

  if (!store) {
    throw new Error("error occur in useInitialPosition");
  }

  useEffect(() => {
    setPosition(store.getState().position);
  }, [store]);

  return { position };
}

export default useInitialPosition;
