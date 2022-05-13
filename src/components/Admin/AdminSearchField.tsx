import { Button, TextInput } from "@dataesr/react-dsfr";
import { useRouter } from "next/router";
import React, { useState } from "react";

const AdminSearchField = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const gotToPsy = (e) => {
    e.preventDefault();
    router.push(`/administration-annuaire/psychologists/${search}`);
  };

  return (
    <>
      <h1>Admin</h1>
      <form onSubmit={gotToPsy}>
        <TextInput
          required
          type="number"
          label="Entrez l'id d'un dossier"
          //@ts-ignore
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button submit>Rechercher</Button>
      </form>
    </>
  );
};

export default AdminSearchField;
