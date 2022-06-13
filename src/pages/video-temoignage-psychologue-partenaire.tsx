import Head from "next/head";
import React from "react";

const PageVideoTemoignage = () => {
  return (
    <>
      <Head>
        <title>Témoignage d&apos;une psychologue partenaire</title>
      </Head>
      <div className="fr-container fr-my-6w">
        <div>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video width="100%" controls style={{ cursor: "pointer" }}>
            <source type="video/mp4" src="/images/Video-Temoignage.mp4" />
          </video>
        </div>
      </div>
    </>
  );
};

export default PageVideoTemoignage;
