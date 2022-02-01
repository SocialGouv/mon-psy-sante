import {
  Header,
  HeaderBody,
  HeaderOperator,
  Logo,
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
    </Header>
  );
};

export default Nav;
