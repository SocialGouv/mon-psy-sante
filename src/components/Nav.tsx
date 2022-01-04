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
        <Logo>République Française</Logo>
        <HeaderOperator>
          <img src="/images/cpam.png" alt="CNAM" />
        </HeaderOperator>
        <Service
          title="MonPsySanté"
          description="En parler, c’est déjà se soigner."
        />
      </HeaderBody>
    </Header>
  );
};

export default Nav;
