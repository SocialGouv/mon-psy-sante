import { NextApiRequest, NextApiResponse } from "next";

import { handleApiError } from "../../../services/api";
import config from "../../../services/config";
import { getAll } from "../../../services/psychologists";

const psychologists = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    if (!config.displayDirectory) {
      return res.status(200).json([]);
    }
    const filters = req.query;
    const psychologists = await getAll(filters);
    return res.status(200).json(psychologists);
  }
};

export default handleApiError(psychologists);