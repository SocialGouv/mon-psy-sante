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
          <img src="/images/cpam.png" alt="CNAM" width="200" height="66" />
        </HeaderOperator>
        <Service
          title="MonPsy"
          description="En parler, c’est déjà se soigner."
        />
      </HeaderBody>
      <HeaderNav>
        <NavItem title="Accueil" link="/" />
        <NavItem title="Je suis angoissé(e) ou déprimé(e)" link="/patients" />
        <NavItem title="Je suis psychologue" link="/psychologues" />
        <NavItem title="Je suis médecin" link="/medecins" />
      </HeaderNav>
    </Header>
  );
};

export default Nav;
