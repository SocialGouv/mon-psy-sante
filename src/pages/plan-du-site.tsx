import Head from "next/head";
import Link from "next/link";
import React from "react";

const items = [
  { title: "Accueil", href: "/" },
  { title: "Annuaire MonParcoursPsy", href: "/annuaire" },
  { title: "Psychologue", href: "/psychologues" },
  { title: "Médecin", href: "/medecins" },
  { title: "Foire aux questions", href: "/faq" },
  { title: "Nous contacter", href: "/contact" },
  { href: "/accessibilite", title: "Accessibilité : partiellement conforme" },
  { href: "/mentions-legales", title: "Mentions légales" },
  {
    href: "/politique-de-confidentialite",
    title: "Politique de confidentialité",
  },
  { href: "/stats", title: "Statistiques" },
];
const Page = () => {
  return (
    <>
      <Head>
        <title>Accessibilité | MonPsy</title>
      </Head>

      <div className="fr-container fr-my-6w">
        <h1>Plan du site</h1>
        <ul>
          {items.map((item, index) => (
            <li key={item.title}>
              <Link href={item.href}>
                <a tabIndex={index + 1}>{item.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Page;
