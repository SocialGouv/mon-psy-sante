import { Alert, Button, Col, SearchableSelect } from "@dataesr/react-dsfr";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  AROUND_ME,
  AROUND_ME_OPTION,
  search,
} from "../../services/frontend/geo.api";
import { Coordinates } from "../../types/coordinates";
import { Search } from "./Directory.styles";

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

    search(filterText, setOptions);
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
