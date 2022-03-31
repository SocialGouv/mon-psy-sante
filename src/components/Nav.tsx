import {
  Header,
  HeaderBody,
  HeaderNav,
  HeaderOperator,
  Logo,
  NavItem,
  Service,
} from "@dataesr/react-dsfr";
import React from "react";

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
        <NavItem title="Accueil" link="/" />
        <NavItem title="Je ne me sens pas bien" link="/patients" />
        <NavItem title="Je suis psychologue" link="/psychologues" />
        <NavItem title="Je suis médecin" link="/medecins" />
        <NavItem title="Foire aux questions" link="/faq" />
      </HeaderNav>
    </Header>
  );
};

export default Nav;
