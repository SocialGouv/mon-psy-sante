import React from "react";

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
    link: "https://www.gouvernement.fr",
    title: "gouvernement.fr",
  },
  {
    link: "https://www.service-public.fr",
    title: "service-public.fr",
  },
  {
    link: "https://www.legifrance.gouv.fr",
    title: "legifrance.gouv.fr",
  },
  {
    link: "https://www.data.gouv.fr",
    title: "data.gouv.fr",
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
  {
    link: "/politique-de-confidentialite",
    title: "Politique de confidentialité",
  },
  {
    link: "/contact",
    title: "Nous contacter",
  },
];

const Footer = () => (
  <footer className="fr-footer" role="contentinfo" id="footer">
    <div className="fr-container">
      <div className="fr-footer__body">
        <div className="fr-footer__brand fr-enlarge-link">
          <p className="fr-logo">
            République
            <br />
            Française
          </p>
          <a
            className="fr-footer__brand-link"
            href="/"
            title="Retour à l’accueil"
          >
            <img src="/images/cnam.png" alt="CNAM" width="200" height="66" />
          </a>
        </div>
        <div className="fr-footer__content">
          <p className="fr-footer__content-desc">
            <>
              Le code source est ouvert et les contributions sont bienvenues.{" "}
              <a
                href="https://github.com/socialgouv/mon-psy-sante/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir le code source
              </a>
              . Illustrations de{" "}
              <a
                href="https://storyset.com/work"
                target="_blank"
                rel="noreferrer nofollow noopener"
              >
                Freepik Storyset
              </a>
              .
            </>
          </p>
          <ul className="fr-footer__content-list">
            {footerBodyLinks.map((item) => (
              <li className="fr-footer__content-item" key={item.title}>
                <a className="fr-footer__content-link" href={item.link}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="fr-footer__bottom">
        <ul className="fr-footer__bottom-list">
          {footerBottomLinks.map((item) => (
            <li className="fr-footer__bottom-item" key={item.title}>
              <a className="fr-footer__bottom-link" href={item.link}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="fr-footer__bottom-copy">
          <p>
            Sauf mention contraire, tous les contenus de ce site sont sous{" "}
            <a
              href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
              target="_blank"
              rel="noreferrer"
            >
              licence etalab-2.0
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
