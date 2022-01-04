import {
  Footer as FooterDS,
  FooterBody,
  FooterBodyItem,
  FooterBottom,
  FooterCopy,
  FooterLink,
  Logo,
} from "@dataesr/react-dsfr";
import React from "react";

const FooterDescription = () => (
  <>
    Le code source est ouvert et les contributions sont bienvenues.{" "}
    <a
      href="https://github.com/betagouv/sante-psy"
      target="_blank"
      rel="noopener noreferrer"
    >
      Voir le code source
    </a>
    .
  </>
);
const footerBodyLinks = [
  {
    link: "https://solidarites-sante.gouv.fr",
    title: "solidarites-sante.gouv.fr",
  },
  {
    link: "https://www.ameli.fr",
    title: "ameli.fr",
  },
  {
    link: "https://beta.gouv.fr/",
    title: "beta.gouv.fr",
  },
];

const footerBottomLinks = [
  {
    link: "/mentions-legales#accessibilite",
    title: "Accessibilité : non conforme",
  },
  {
    link: "/mentions-legales",
    title: "Mentions légales",
  },
];

const Footer = () => (
  <FooterDS>
    <FooterBody description={<FooterDescription />}>
      <Logo>Ministère des Solidarités et de la Santé</Logo>
      {footerBodyLinks.map((item) => (
        <FooterBodyItem key={item.title}>
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
        </FooterBodyItem>
      ))}
    </FooterBody>
    <FooterBottom>
      {footerBottomLinks.map((item) => (
        <FooterLink key={item.title} href={item.link}>
          {item.title}
        </FooterLink>
      ))}
    </FooterBottom>
    <FooterCopy>
      <p>
        Sauf mention contraire, tous les textes de ce site sont sous{" "}
        <a
          href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
          rel="noreferrer"
          target="_blank"
        >
          licence etalab-2.0
        </a>
      </p>
    </FooterCopy>
  </FooterDS>
);

export default Footer;
