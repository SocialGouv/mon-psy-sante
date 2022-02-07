import { NextApiRequest, NextApiResponse } from "next";

import { handleApiError } from "../../../services/api";
import { countAll } from "../../../services/psychologists";

const count = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const count = await countAll();
    return res.status(200).json(count);
  }
};

export default handleApiError(count);
