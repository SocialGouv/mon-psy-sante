import {
  Header,
  HeaderBody,
  HeaderNav,
  HeaderOperator,
  Logo,
  NavItem,
  Service,
} from "@dataesr/react-dsfr";
import Link from "next/link";
import React from "react";

const NavLink = (props) => (
  <Link href={props.href}>
    <a className="fr-nav__link">{props.children}</a>
  </Link>
);

const Nav = () => {
  return (
    <Header>
      <HeaderBody>
        <Logo splitCharacter={10}>République Française</Logo>
        <HeaderOperator>
          <img src="/images/cnam.png" alt="CNAM" width="200" height="66" />
        </HeaderOperator>
        <Service
          title="MonPsy"
          description="En parler, c’est déjà se soigner."
        />
      </HeaderBody>
      <HeaderNav>
        <NavItem title="Accueil" asLink={<NavLink href="/" />} />
        <NavItem
          title="Je ne me sens pas bien"
          asLink={<NavLink href="/patients" />}
        />
        <NavItem
          title="Je suis psychologue"
          asLink={<NavLink href="/psychologues" />}
        />
        <NavItem
          title="Je suis médecin"
          asLink={<NavLink href="/medecins" />}
        />
        <NavItem title="Foire aux questions" asLink={<NavLink href="/faq" />} />
      </HeaderNav>
    </Header>
  );
};

export default Nav;
