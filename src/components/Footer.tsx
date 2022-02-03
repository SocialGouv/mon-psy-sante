import {
  Footer as FooterDS,
  FooterBody,
  FooterBodyItem,
  FooterBottom,
  FooterCopy,
  FooterLink,
  FooterOperator,
  Logo,
} from "@dataesr/react-dsfr";
import React from "react";

const FooterDescription = () => (
  <>
    Le code source est ouvert et les contributions sont bienvenues.{" "}
    <a
      href="https://github.com/socialgouv/mon-psy-sante/"
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
    link: "https://www.gouvernement.fr",
    title: "gouvernement.fr",
  },
  {
    link: "http://www.service-public.fr",
    title: "service-public.fr",
  },
  {
    link: "http://legifrance.gouv.fr",
    title: "legifrance.gouv.fr",
  },
  {
    link: "http://data.gouv.fr",
    title: "data.gouv.fr",
  },
  {
    link: "https://solidarites-sante.gouv.fr",
    title: "solidarites-sante.gouv.fr",
  },
  {
    link: "https://www.ameli.fr",
    title: "ameli.fr",
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
      <Logo splitCharacter={10}>République Française</Logo>
      <FooterOperator>
        <img src="/images/cpam.png" alt="CNAM" width="200" height="66" />
      </FooterOperator>
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
        Sauf mention contraire, tous les contenus de ce site sont sous{" "}
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
