import Head from "next/head";
import React from "react";

type HeadProps = {
  title: string;
  description: string;
  image?: string;
};

const HeadTag = ({ title, description, image }: HeadProps) => (
  <Head>
    <title>{title}</title>
    <meta property="og:title" content={title} />

    <meta name="description" content={description} />
    <meta name="og:description" content={description} />
    <link rel="shortcut icon" href="/favicon.ico" />

    <meta property="og:type" content="website" />
    <meta
      property="og:image"
      content={`https://monpsy.sante.gouv.fr/images/${image}`}
    />
  </Head>
);
HeadTag.defaultProps = {
  image: "Illustration.svg",
};
export default HeadTag;
