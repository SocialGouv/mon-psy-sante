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
  positionFilter: string | [number, number];
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionFilter]);

  return (
    <div className="fr-grid-row fr-grid-row--middle fr-pb-2w">
      <div className="fr-col-md-4 fr-col-12 fr-pr-md-4w">
        <div className="fr-select-group">
          <label className="fr-label fr-mb-2v" htmlFor="city-search">
            Rechercher par ville ou code postal
          </label>
          <div className="select-search-input">
            <ReactAutocomplete
              inputProps={{
                id: "city-search",
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
      </div>
      <div className="fr-col-md-4 fr-col-12 fr-pr-md-4w">
        <div className="fr-select-group">
          <label className="fr-label" htmlFor="select-type">
            Souhait du psychologue d&apos;accompagner des
          </label>
          <select
            className="fr-select"
            required
            id="select-type"
            name="select"
            value={otherFilters[FILTER.PUBLIC]}
            onChange={(e) =>
              setOtherFilters({
                ...otherFilters,
                [FILTER.PUBLIC]: e.target.value,
              })
            }
          >
            {allPublicsFilters.map((option) => (
              <option key={option.label || option.value} value={option.value}>
                {option.label || option.value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="fr-col-md-4 fr-col-12">
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
      </div>
      <div className="fr-col-12 fr-pt-2w">
        <button
          className="fr-btn--md fr-btn"
          disabled={!coords || geoLoading}
          onClick={loadPsychologists}
        >
          {geoLoading ? "Chargement..." : "Rechercher"}
        </button>
      </div>
      {positionFilter === AROUND_ME && geoStatus === geoStatusEnum.DENIED && (
        <div className="fr-alert fr-alert--error fr-mt-1w">
          <p className="fr-alert__title">Géolocalisation indisponible</p>
          <p>
            Veuillez autoriser la géolocalisation sur votre navigateur pour
            utiliser cette fonctionnalité.
          </p>
        </div>
      )}
      {positionFilter === AROUND_ME && geoStatus === geoStatusEnum.UNSUPPORTED && (
        <div className="fr-alert fr-alert--error fr-mt-1w">
          <p className="fr-alert__title">Géolocalisation indisponible</p>
          <p>
            Votre navigateur ne permet pas d&apos;utiliser cette fonctionnalité.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
