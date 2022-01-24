import { Alert, Button, Col, SearchableSelect } from "@dataesr/react-dsfr";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Coordinates } from "../../types/coordinates";
import { getDepartment } from "../utils/departments";
import { Search } from "./Directory.styles";

const AROUND_ME = "Autour de moi";
const AROUND_ME_OPTION = [{ label: AROUND_ME, value: AROUND_ME }];

const geoStatusEnum = {
  DENIED: -1,
  GRANTED: 1,
  UNKNOWN: 0,
  UNSUPPORTED: -2,
};

const SearchBar = ({
  filter,
  setFilter,
  coords,
  setCoords,
  geoLoading,
  setGeoLoading,
  loadMorePsychologists,
  loadPsychologists,
}: {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  coords: Coordinates;
  setCoords: Dispatch<SetStateAction<Coordinates>>;
  geoLoading: boolean;
  setGeoLoading: Dispatch<SetStateAction<boolean>>;
  loadMorePsychologists: () => void;
  loadPsychologists: (page: number) => void;
}) => {
  const [filterText, setFilterText] = useState("");
  const [geoStatus, setGeoStatus] = useState(geoStatusEnum.UNKNOWN);
  const [options, setOptions] = useState(AROUND_ME_OPTION);

  const searchCommunes = () => {
    if (filterText.length > 2 && filterText !== AROUND_ME) {
      axios
        .get(
          `https://geo.api.gouv.fr/communes?nom=${filterText}&limit=10&fields=population,centre,departement,nom`
        )
        .then((response) => {
          const communes = response.data
            .sort((a, b) => b.population - a.population)
            .map((commune) => ({
              label: `${commune.nom}, ${commune.departement.nom}`,
              value: commune.centre.coordinates,
            }));
          setOptions(communes.concat(AROUND_ME_OPTION));
        });
    }
  };

  const searchDepartment = async (department: string) => {
    const results = await Promise.all(
      department
        .split("|")
        .map((x) =>
          axios.get(
            `https://geo.api.gouv.fr/departements/${x}/communes?fields=population,centre,departement,nom,codesPostaux`
          )
        )
    );

    const communes = results
      .flatMap((result) => result.data)
      .flatMap((commune) =>
        commune.codesPostaux.map((codePostal) => ({
          centre: commune.centre,
          codePostal,
          departement: commune.departement,
          nom: commune.nom,
          population: commune.population,
        }))
      )
      .filter((commune) => commune.codePostal.startsWith(filterText))
      .sort((a, b) => b.population - a.population)
      .map((commune) => {
        return {
          label: `${commune.nom}, ${commune.codePostal}, ${commune.departement.nom}`,
          value: `${commune.codePostal} ${commune.nom}`,
        };
      });
    setOptions(communes.concat(AROUND_ME_OPTION));
  };

  const success = (pos) => {
    const { longitude, latitude } = pos.coords;
    setCoords({ latitude, longitude });
    setGeoStatus(geoStatusEnum.GRANTED);
    setGeoLoading(false);
  };

  const errors = () => {
    setGeoStatus(geoStatusEnum.DENIED);
  };

  const getGeolocation = (state) => {
    if (state === "granted") {
      setGeoLoading(true);
      navigator.geolocation.getCurrentPosition(success);
    } else if (state === "prompt") {
      setGeoLoading(true);
      navigator.geolocation.getCurrentPosition(success, errors);
    } else if (state === "denied") {
      setGeoStatus(geoStatusEnum.DENIED);
    }
  };

  const checkGeolocationPermission = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        getGeolocation(result.state);
      });
    } else {
      setGeoStatus(geoStatusEnum.UNSUPPORTED);
    }
  };

  useEffect(() => {
    if (filter === AROUND_ME) {
      checkGeolocationPermission();
    }
  }, [filter]);

  useEffect(() => {
    if (filter) {
      return;
    }

    if (filterText) {
      if (isNaN(+filterText)) {
        searchCommunes();
        return;
      }

      const department = getDepartment(filterText);
      if (department) {
        searchDepartment(department);
        return;
      }
    }

    setOptions(AROUND_ME_OPTION);
  }, [filterText]);

  return (
    <Search>
      <Col n="md-9 12">
        <SearchableSelect
          selected={filter}
          onChange={setFilter}
          onTextChange={setFilterText}
          filter={(label, option) =>
            option.label === AROUND_ME ||
            option.label.toLowerCase().includes(label.toLowerCase())
          }
          label="Rechercher par ville ou code postal"
          options={options}
        />
      </Col>
      <Col offset="md-1" n="md-2 12" className="align-right">
        <Button
          secondary
          className="fr-hidden-md fr-mt-1w"
          onClick={loadMorePsychologists}
        >
          Plus de psychologues
        </Button>
        <Button
          className="fr-ml-1w fr-mt-1w"
          disabled={!coords || geoLoading}
          onClick={() => {
            loadPsychologists(0);
          }}
        >
          {geoLoading ? "Chargement..." : "Rechercher"}
        </Button>
      </Col>
      {filter === AROUND_ME && geoStatus === geoStatusEnum.DENIED && (
        <Alert
          className="fr-mt-1w"
          type="error"
          description="Veuillez autoriser la géolocalisation sur votre navigateur pour utiliser cette
                fonctionnalité."
        />
      )}
      {filter === AROUND_ME && geoStatus === geoStatusEnum.UNSUPPORTED && (
        <Alert
          className="fr-mt-1w"
          type="error"
          description="Votre navigateur ne permet pas d'utiliser cette fonctionnalité."
        />
      )}
    </Search>
  );
};

export default SearchBar;
