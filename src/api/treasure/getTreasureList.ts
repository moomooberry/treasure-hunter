import {
  RequestHandler,
  RequestPaginationParameter,
  RequestPaginationResponse,
} from "@src/types/api";
import { Position } from "@src/types/position";
import { TreasureItem } from "@src/types/treasure";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export const API_GET_TREASURE_LIST_KEY = "/treasure";

interface GetTreasureListParameter {
  position: Position;
  distance: number;
}

const getTreasureList: RequestHandler<
  RequestPaginationParameter<GetTreasureListParameter>,
  RequestPaginationResponse<TreasureItem[]>
> = async ({ pageNumber, pageSize, position, distance }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}${API_GET_TREASURE_LIST_KEY}?pageNumber=${pageNumber}&pageSize=${pageSize}&lat=${position.lat}&lng=${position.lng}&distance=${distance}`,
      {
        next: {
          revalidate: 5 * 60,
          tags: [API_GET_TREASURE_LIST_KEY],
        },
      }
    );

    const { data, count, status, statusText } =
      (await res.json()) as PostgrestSingleResponse<TreasureItem[]>;

    return {
      code: status,
      message: statusText,
      pagination: {
        totalElement: count ?? 0,
        pageNumber,
      },
      data: data ?? [],
    };
  } catch (e) {
    return {
      code: 404,
      message: "error from getTreasureList",
      pagination: { totalElement: 0, pageNumber },
      data: undefined,
    };
  }
};

export default getTreasureList;
