import {
  Alert,
  Button,
  Col,
  SearchableSelect,
  Table,
} from "@dataesr/react-dsfr";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import { Coordinates } from "../types/coordinates";
import { FILTER } from "../types/enums/filters";
import { Psychologist } from "../types/psychologist";
import { departments, getDepartment } from "./utils/departments";

const AROUND_ME = "Autour de moi";
const AROUND_ME_OPTION = [{ label: AROUND_ME, value: AROUND_ME }];

const geoStatusEnum = {
  DENIED: -1,
  GRANTED: 1,
  UNKNOWN: 0,
  UNSUPPORTED: -2,
};

const columns = [
  {
    label: "Nom",
    name: "name",
    render: (psychologist) =>
      `${psychologist.lastName.toUpperCase()} ${psychologist.firstName}`,
  },
  {
    label: "Adresse",
    name: "address",
  },
];

const Directory = () => {
  const router = useRouter();
  const table = useRef(null);

  const [coords, setCoords] = useState<Coordinates>();
  const [geoStatus, setGeoStatus] = useState(geoStatusEnum.UNKNOWN);
  const [geoLoading, setGeoLoading] = useState(false);
  const [options, setOptions] = useState(AROUND_ME_OPTION);

  const [psychologists, setPsychologists] = useState<Psychologist[]>();
  const [currentPage, setCurrentPage] = useState(1);

  const [filter, setFilter] = useState<any>("");
  const [filterText, setFilterText] = useState("");

  const loadPsychologists = () => {
    let query = "";
    if (coords) {
      query = `?${FILTER.LONGITUDE}=${coords.longitude}&${FILTER.LATITUDE}=${coords.latitude}`;
    }
    axios
      .get(`/api/psychologists${query}`)
      .then((response) => setPsychologists(response.data));
  };

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DISPLAY_DIRECTORY !== "true") {
      router.push("/");
    } else {
      loadPsychologists();
    }
  }, []);

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
    if (!coords) {
      if (navigator.geolocation) {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          getGeolocation(result.state);
        });
      } else {
        setGeoStatus(geoStatusEnum.UNSUPPORTED);
      }
    }
  };

  useEffect(() => {
    if (filter === AROUND_ME) {
      checkGeolocationPermission();
    } else if (filter && typeof filter === "string") {
      axios
        .get(
          `https://api-adresse.data.gouv.fr/search/?q=${filter}&postCode=${filter}`
        )
        .then((response) => {
          const coordinates = response.data.features[0].geometry.coordinates;
          setCoords({
            latitude: coordinates[1],
            longitude: coordinates[0],
          });
        });
    } else if (filter) {
      const coordinates = filter.split("-");
      setCoords({
        latitude: coordinates[1],
        longitude: coordinates[0],
      });
    }
  }, [filter]);

  const searchCommunes = () => {
    if (filterText.length > 2 && filterText !== AROUND_ME) {
      axios
        .get(
          `https://geo.api.gouv.fr/communes?nom=${filterText}&limit=10&fields=population,centre,departement,nom`
        )
        .then((response) => {
          console.log(response.data);
          const communes = response.data
            .sort((a, b) => b.population - a.population)
            .map((commune) => ({
              label: `${commune.nom}, ${commune.departement.nom}`,
              value: `${commune.centre.coordinates[0]}-${commune.centre.coordinates[1]}`,
            }));
          setOptions(communes.concat(AROUND_ME_OPTION));
        });
    }
  };

  const searchDepartment = (department: string) => {
    axios
      .get(
        `https://geo.api.gouv.fr/departements/${department}/communes?limit=10&fields=population,centre,departement,nom,codesPostaux`
      )
      .then((response) => {
        console.log(response.data);
        const communes = response.data
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
          .map((commune) => ({
            label: `${commune.nom}, ${commune.codePostal}, ${commune.departement.nom}`,
            value: commune.codePostal,
          }));
        setOptions(communes.concat(AROUND_ME_OPTION));
      });
  };

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

  if (!psychologists) {
    return null;
  }

  return (
    <>
      <SearchableSelect
        className="fr-mb-1w"
        selected={filter}
        onChange={setFilter}
        onTextChange={setFilterText}
        filter={(label, option) =>
          option.label === AROUND_ME ||
          option.label.toLowerCase().includes(label.toLowerCase())
        }
        label="Rechercher par ville, code postal ou région"
        options={options}
      />
      <Button disabled={!coords} onClick={() => loadPsychologists()}>
        Rechercher
      </Button>
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
      <div ref={table}>
        <Col n="md-6 sm-12">
          <Table
            data-test-id="psy-table"
            className="fr-mb-3w"
            caption={"Psychologues"}
            rowKey="id"
            columns={columns}
            data={psychologists}
            pagination
            paginationPosition="center"
            page={currentPage}
            perPage={10}
            setPage={(p) => {
              setCurrentPage(p);
              table.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            surrendingPages={3}
          />
        </Col>
        <Col n="md-6 sm-12" />
      </div>
    </>
  );
};

export default Directory;
