import { withAuth } from "next-auth/middleware";

import { authorize } from "../../services/middleware";

export default withAuth({
  callbacks: {
    authorized: authorize,
  },
});
