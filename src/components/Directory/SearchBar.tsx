import { Alert, Button, Col, Row, Select } from "@dataesr/react-dsfr";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactAutocomplete from "react-autocomplete";

import {
  AROUND_ME,
  AROUND_ME_OPTION,
  searchCity,
} from "../../services/frontend/geo.api";
import { Coordinates } from "../../types/coordinates";
import { FILTER } from "../../types/enums/filters";
import { allPublicsFilters } from "../../types/enums/public";
import { SubSearch } from "./Directory.styles";

const geoStatusEnum = {
  DENIED: -1,
  GRANTED: 1,
  UNKNOWN: 0,
  UNSUPPORTED: -2,
};

const SearchBar = ({
  positionFilter,
  setPositionFilter,
  otherFilters,
  setOtherFilters,
  coords,
  setCoords,
  geoLoading,
  setGeoLoading,
  loadPsychologists,
}: {
  positionFilter: string;
  setPositionFilter: Dispatch<SetStateAction<string>>;
  otherFilters: any;
  setOtherFilters: Dispatch<SetStateAction<any>>;
  coords: Coordinates;
  setCoords: Dispatch<SetStateAction<Coordinates>>;
  geoLoading: boolean;
  setGeoLoading: Dispatch<SetStateAction<boolean>>;
  loadPsychologists: () => void;
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
    setGeoLoading(false);
  };

  const getGeolocation = (state) => {
    if (state === "granted") {
      setGeoLoading(true);
      navigator.geolocation.getCurrentPosition(success, errors);
    } else if (state === "prompt") {
      setGeoLoading(true);
      navigator.geolocation.getCurrentPosition(success, errors);
    } else if (state === "denied") {
      setGeoStatus(geoStatusEnum.DENIED);
    }
  };

  const checkGeolocationPermission = () => {
    if (navigator.geolocation && navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        getGeolocation(result.state);
      });
    } else {
      setGeoStatus(geoStatusEnum.UNSUPPORTED);
    }
  };

  useEffect(() => {
    if (positionFilter === AROUND_ME) {
      checkGeolocationPermission();
    }
  }, [positionFilter]);

  return (
    <Row className="fr-pb-2w" alignItems="middle">
      <Col n="md-9 12">
        <div className="fr-select-group">
          <label className="fr-label fr-mb-2v" htmlFor="city-search">
            Rechercher par ville ou code postal
          </label>
          <div className="select-search-input">
            <ReactAutocomplete
              id="city-search"
              inputProps={{
                className: "fr-select",
                placeholder: "Ville ou code postal",
              }}
              wrapperStyle={{}}
              getItemValue={(item) => item.label}
              items={options}
              renderItem={(item, isHighlighted) => (
                <li
                  role="option"
                  key={item.label}
                  aria-selected={isHighlighted}
                  className={`select-search-option ${
                    isHighlighted ? "select-search-option__selected" : ""
                  }`}
                >
                  {item.label}
                </li>
              )}
              renderMenu={(items) => (
                <ul className="select-search-options select-search-options__visible no-bullet fr-p-0">
                  {items}
                </ul>
              )}
              value={filterText}
              onChange={(e) => {
                setFilterText(e.target.value);
                searchCity(e.target.value, setOptions);
              }}
              onSelect={(val, item) => {
                setFilterText(val);
                setPositionFilter(item.value);
              }}
            />
          </div>
        </div>
        <SubSearch>
          <Select
            selected={otherFilters[FILTER.PUBLIC]}
            //@ts-ignore
            onChange={(e) =>
              setOtherFilters({
                ...otherFilters,
                [FILTER.PUBLIC]: e.target.value,
              })
            }
            label="Souhait du psychologue d'accompagner des"
            options={allPublicsFilters.map((option) => ({
              label: option.label || option.value,
              value: option.value,
            }))}
          />

          <div className="fr-toggle">
            <input
              id="checkbox-teleconsultation"
              type="checkbox"
              className="fr-toggle__input"
              checked={otherFilters[FILTER.TELECONSULTATION]}
              onChange={(e) =>
                setOtherFilters({
                  ...otherFilters,
                  [FILTER.TELECONSULTATION]: e.target.checked,
                })
              }
            />
            <label
              className="fr-toggle__label"
              htmlFor="checkbox-teleconsultation"
            >
              Possibilité de séances à distance
            </label>
          </div>
        </SubSearch>
      </Col>
      <Col n="md-3 12" className="align-center">
        <Button
          className="fr-ml-1w fr-mt-1w"
          disabled={!coords || geoLoading}
          onClick={loadPsychologists}
        >
          {geoLoading ? "Chargement..." : "Rechercher"}
        </Button>
      </Col>
      {positionFilter === AROUND_ME && geoStatus === geoStatusEnum.DENIED && (
        <Alert
          title="Géolocalisation indisponible"
          className="fr-mt-1w"
          type="error"
          description="Veuillez autoriser la géolocalisation sur votre navigateur pour utiliser cette
                fonctionnalité."
        />
      )}
      {positionFilter === AROUND_ME &&
        geoStatus === geoStatusEnum.UNSUPPORTED && (
          <Alert
            title="Géolocalisation indisponible"
            className="fr-mt-1w"
            type="error"
            description="Votre navigateur ne permet pas d'utiliser cette fonctionnalité."
          />
        )}
    </Row>
  );
};

export default SearchBar;
