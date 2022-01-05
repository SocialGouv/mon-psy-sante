import { NextApiRequest, NextApiResponse } from "next";

import { handleApiError } from "../../services/api";
import config from "../../services/config";
import { getAll } from "../../services/psychologists";

const psychologists = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    console.log(config);
    if (!config.displayDirectory) {
      return res.status(200).json([]);
    }
    const psychologists = await getAll();
    return res.status(200).json(psychologists);
  }
};

export default handleApiError(psychologists);
