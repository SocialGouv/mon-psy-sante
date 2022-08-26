import axios, { AxiosResponse } from "axios";

import { AdeliData, AdeliRawResponse } from "../../types/adeli";
import { zip } from "../../utils/array";
import config from "../config";
import { formatAdeliId } from "./formatAdeliId";

const rowColumnsToObject = <Column>(row: string[], columns: Column[]) =>
  Object.fromEntries(zip(columns, row));

const formatAdeliResponse = (response: AdeliRawResponse): AdeliData[] =>
  response.rows.map((row) =>
    rowColumnsToObject(row, response.columns)
  ) as AdeliData[];

export const requestAdeli = async (
  numeroAdeli: string
): Promise<AdeliData[]> => {
  if (!numeroAdeli) return Promise.reject("numeroAdeli empty");
  const response = await axios.get<any, AxiosResponse<AdeliRawResponse>>(
    config.adeli.apiUrl,
    {
      params: {
        "Identification nationale PP__exact": formatAdeliId(
          numeroAdeli
        ).padStart(10, "0"),
      },
    }
  );

  return formatAdeliResponse(response.data);
};
