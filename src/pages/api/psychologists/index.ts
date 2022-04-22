import { NextApiRequest, NextApiResponse } from "next";

import { handleApiError } from "../../../services/api";
import { getAll } from "../../../services/psychologists";
import { API_ENDPOINT_FILTER } from "../../../types/enums/filters";

const FILTERS = Object.values(API_ENDPOINT_FILTER);

function hasParamsNotAllowed(filters) {
  return Object.keys(filters).filter((q) => !FILTERS.includes(q)).length;
}

const psychologists = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const filters = req.query;
    if (hasParamsNotAllowed(filters)) {
      return res.status(400).send("Query params not allowed");
    }
    const psychologists = await getAll(filters);

    return res.status(200).json(
      psychologists.map((psy) => ({
        ...psy,
        email: psy.displayEmail ? psy.email : undefined,
      }))
    );
  }
};

export default handleApiError(psychologists);
