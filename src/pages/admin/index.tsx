import { getSession, signOut, useSession } from "next-auth/react";
import React from "react";

const Admin = ({ user }) => {
  const { data: session } = useSession();

  console.log("Session", session);
  console.log("User", user);

  return (
    <div>
      <div>Authenticated as admin</div>
      <button onClick={() => signOut({
        callbackUrl: window.location.origin
      })}>Logout</button>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  console.log(session);
  return {
    props: {
      user: session?.user || {},
    },
  };
};

export default Admin;
