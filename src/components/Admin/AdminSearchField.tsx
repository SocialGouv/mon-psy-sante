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
          <label className="fr-label" htmlFor="text-input-text">
            Entrez l&apos;id d&apos;un dossier
          </label>
          <input
            className="fr-input"
            required
            type="number"
            id="text-input-text"
            name="text-input-text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="fr-btn" type="submit">
          Rechercher
        </button>
      </form>
    </>
  );
};

export default AdminSearchField;
