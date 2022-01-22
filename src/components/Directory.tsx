import { Alert, Button, Col, SearchableSelect } from "@dataesr/react-dsfr";
import axios from "axios";
import { useRouter } from "next/router";
import React, { createRef, useEffect, useRef, useState } from "react";

import { Coordinates } from "../types/coordinates";
import { FILTER } from "../types/enums/filters";
import { Psychologist as PsychologistType } from "../types/psychologist";
import {
  DirectoryWrapper,
  Psychologists,
  Results,
  Search,
} from "./Directory.styles";
import Psychologist from "./Psychologist";
import PsychologistsMap from "./PsychologistsMap";
import { getDepartment } from "./utils/departments";

const AROUND_ME = "Autour de moi";
const AROUND_ME_OPTION = [{ label: AROUND_ME, value: AROUND_ME }];

const geoStatusEnum = {
  DENIED: -1,
  GRANTED: 1,
  UNKNOWN: 0,
  UNSUPPORTED: -2,
};

const Directory = () => {
  const router = useRouter();

  const [coords, setCoords] = useState<Coordinates>();
  const [geoStatus, setGeoStatus] = useState(geoStatusEnum.UNKNOWN);
  const [geoLoading, setGeoLoading] = useState(false);
  const [options, setOptions] = useState(AROUND_ME_OPTION);
  const currentPageRef = useRef(0);

  const [psychologists, setPsychologists] = useState<PsychologistType[]>();
  const psychologistsRefs = useRef<any>();
  const resultsRef = useRef(null);
  const [selectedPsychologist, setSelectedPsychologist] = useState<number>();
  const [mapCenter, setMapCenter] = useState<Coordinates>();

  const [filter, setFilter] = useState<any>("");
  const [filterText, setFilterText] = useState("");

  const loadPsychologists = (currentPage) => {
    let query = `?${FILTER.PAGE_INDEX}=${currentPage}`;
    if (coords) {
      query = `${query}&${FILTER.LONGITUDE}=${coords.longitude}&${FILTER.LATITUDE}=${coords.latitude}`;
      setMapCenter(coords);
    }
    axios.get(`/api/psychologists${query}`).then((response) => {
      if (currentPage === 0) {
        const refs = {};
        response.data.forEach((x) => (refs[x.id] = createRef()));
        psychologistsRefs.current = refs;
        if (resultsRef.current) {
          resultsRef.current.scrollTo({ top: 0 });
        }
        setSelectedPsychologist(null);
        setPsychologists(response.data);
      } else {
        response.data.forEach(
          (x) => (psychologistsRefs.current[x.id] = createRef())
        );
        setPsychologists(psychologists.concat(response.data));
      }

      if (!coords) {
        const [longitude, latitude] = response.data[0].coordinates.coordinates;
        setMapCenter({
          latitude,
          longitude,
        });
      }
    });
  };

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DISPLAY_DIRECTORY !== "true") {
      router.push("/");
    } else {
      loadPsychologists(0);
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
    } else if (filter && typeof filter === "string") {
      setGeoLoading(true);
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
          setGeoLoading(false);
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

  const searchDepartment = async (department: string) => {
    const results = await Promise.all(
      department
        .split("|")
        .map((x) =>
          axios.get(
            `https://geo.api.gouv.fr/departements/${x}/communes?limit=10&fields=population,centre,departement,nom,codesPostaux`
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

  const onClick = (psychologist: PsychologistType) => {
    setSelectedPsychologist(psychologist.id);
    setMapCenter({
      latitude: psychologist.coordinates.coordinates[1],
      longitude: psychologist.coordinates.coordinates[0],
    });
  };

  const loadMorePsychologists = () => {
    loadPsychologists(currentPageRef.current + 1);
    currentPageRef.current = currentPageRef.current + 1;
  };

  if (!psychologists) {
    return null;
  }

  return (
    <DirectoryWrapper>
      <Search>
        <Col n="md-9 sm-12">
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
        <Col offset="md-1" n="md-2 sm-12" className="align-right">
          <Button
            className="fr-mt-1w"
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
      <Results>
        <Psychologists className="fr-col-md-6 fr-col-sm-12" ref={resultsRef}>
          {psychologists.map((psychologist) => (
            <div
              ref={psychologistsRefs.current[psychologist.id]}
              key={psychologist.id}
            >
              <Psychologist
                selected={selectedPsychologist === psychologist.id}
                psychologist={psychologist}
                onClick={() => onClick(psychologist)}
              />
            </div>
          ))}
          <Button onClick={loadMorePsychologists}>Plus de psychologues</Button>
        </Psychologists>
        <Col n="md-6 sm-12">
          {mapCenter && (
            <PsychologistsMap
              selectPsychologist={(psychologist) => {
                setSelectedPsychologist(psychologist.id);
                setMapCenter({
                  latitude: psychologist.coordinates.coordinates[1],
                  longitude: psychologist.coordinates.coordinates[0],
                });
                resultsRef.current.scrollTo({
                  top:
                    psychologistsRefs.current[psychologist.id].current
                      .offsetTop - resultsRef.current.offsetTop,
                });
              }}
              mapCenter={[mapCenter.latitude, mapCenter.longitude]}
              psychologists={psychologists}
            />
          )}
        </Col>
      </Results>
    </DirectoryWrapper>
  );
};

export default Directory;
