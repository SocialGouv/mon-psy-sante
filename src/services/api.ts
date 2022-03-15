import { ValidationError } from "joi";
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
      if (error instanceof ValidationError) {
        return res
          .status(400)
          .send(error.details.map((x) => x.message).join(", "));
      }

      res.status(500).send("Something went wrong...");
    }
  };
};
