"use server";

import { API_GET_TREASURE_LIST_KEY } from "@src/libs/fetch/key/treasure";
import {
  RequestHandler,
  RequestPaginationParameter,
  RequestPaginationResponse,
} from "@src/types/api";
import { GetTreasureListResponse } from "@src/types/api/treasure";
import { Position } from "@src/types/position";
import { cookies } from "next/headers";

interface GetTreasureListParameter {
  position: Position;
  distance: number;
}

const getTreasureList: RequestHandler<
  RequestPaginationResponse<GetTreasureListResponse[]>,
  RequestPaginationParameter<GetTreasureListParameter>
> = async ({ pageNumber, pageSize, position, distance }) => {
  const cookieStore = cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}${API_GET_TREASURE_LIST_KEY}?pageNumber=${pageNumber}&pageSize=${pageSize}&lat=${position.lat}&lng=${position.lng}&distance=${distance}`,
    {
      method: "GET",
      next: {
        revalidate: 5 * 60,
        tags: [API_GET_TREASURE_LIST_KEY],
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );

  const data = (await res.json()) as RequestPaginationResponse<
    GetTreasureListResponse[]
  >;

  return data;
};

export default getTreasureList;
