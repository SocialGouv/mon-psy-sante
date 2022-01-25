import { NextApiRequest, NextApiResponse } from "next";

export const handleApiError = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json("Something went wrong...");
    }
  };
};
