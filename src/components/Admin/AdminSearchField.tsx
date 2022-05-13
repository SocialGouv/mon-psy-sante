import { Button } from "@dataesr/react-dsfr";
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
        <div className="fr-input-group">
          <label className="fr-label" aria-describedby="">
            Entrez l’id d’un dossier<span className="error"> *</span>
            <input
              className="fr-input"
              onChange={(e) => setSearch(e.target.value)}
              required
              value={search}
            />
          </label>
        </div>
        <Button submit>Rechercher</Button>
      </form>
    </>
  );
};

export default AdminSearchField;
