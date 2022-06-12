import { useRouter } from "next/router";
import { getProviders, signIn } from "next-auth/react";
import React from "react";

export default function SignIn({
  providers,
}: {
  providers: typeof getProviders;
}): JSX.Element {
  const router = useRouter();
  return (
    <div className="fr-container fr-mt-4w fr-mb-8w">
      <h1>Administration</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="fr-btn"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: router.query.callbackUrl as string,
              })
            }
          >
            Se connecter à l&apos;espace d&apos;administration
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
