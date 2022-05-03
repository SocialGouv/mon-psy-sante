import axios, { AxiosResponse } from "axios";

import { AdeliData, AdeliRawResponse } from "../../types/adeli";
import { zip } from "../../utils/array";
import config from "../config";

const formatRequestedAdeli = (adeliId: string) =>
  adeliId
    .replaceAll(".", "")
    .replaceAll(" ", "")
    .replaceAll("/", "")
    .padStart(10, "0");

const rowColumnsToObject = <Column>(row: string[], columns: Column[]) =>
  Object.fromEntries(zip(columns, row));

const formatAdeliResponse = (response: AdeliRawResponse): AdeliData[] =>
  response.rows.map((row) =>
    rowColumnsToObject(row, response.columns)
  ) as AdeliData[];

export const requestAdeli = async (
  numeroAdeli: string
): Promise<AdeliData[]> => {
  const response = await axios.get<any, AxiosResponse<AdeliRawResponse>>(
    config.adeli.apiUrl,
    {
      params: {
        "Identification nationale PP__exact": formatRequestedAdeli(numeroAdeli),
      },
    }
  );

  return formatAdeliResponse(response.data);
};
