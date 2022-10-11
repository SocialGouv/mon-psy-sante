import axios from "axios";
import React, { createRef, useEffect, useRef, useState } from "react";

import { trackEventDirectorySearch } from "../../services/matomo";
import { Coordinates } from "../../types/coordinates";
import { FILTER } from "../../types/enums/filters";
import { PUBLIC } from "../../types/enums/public";
import { Psychologist as PsychologistType } from "../../types/psychologist";
import Spinner from "../Spinner";
import { ResultWrapper } from "./Directory.styles";
import Footer from "./Footer";
import Results from "./Results";
import SearchBar from "./SearchBar";

const Directory = () => {
  const [coords, setCoords] = useState<Coordinates>();
  const [geoLoading, setGeoLoading] = useState(false);

  const [psychologists, setPsychologists] = useState<PsychologistType[]>();
  const psychologistsRefs = useRef<any>();
  const resultsRef = useRef(null);
  const [selectedPsychologist, setSelectedPsychologist] = useState<number>();
  const [noPsychologist, setNoPsychologist] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mapCenter, setMapCenter] = useState<Coordinates>();
  const [mapZoom, setMapZoom] = useState<number>(12);

  const [positionFilter, setPositionFilter] = useState<
    string | [number, number]
  >("");
  const [otherFilters, setOtherFilters] = useState({
    [FILTER.TELECONSULTATION]: false,
    [FILTER.PUBLIC]: PUBLIC.ADULTES_ADOS_ENFANTS,
  });

  const APPROX_50_KM = 0.5;
  const APPROX_40_KM = 0.4;

  function setupMapAccordingToPsy(distance) {
    if (distance > APPROX_50_KM) {
      setNoPsychologist(true);
      setMapZoom(8);
    } else if (distance > APPROX_40_KM) {
      setMapZoom(10);
    } else {
      setMapZoom(12);
    }
  }

  const loadPsychologists = () => {
    let query = `?`;
    setNoPsychologist(false);
    setIsLoading(true);
    setPsychologists([]);

    query = `${query}&${FILTER.LONGITUDE}=${coords.longitude}&${FILTER.LATITUDE}=${coords.latitude}`;
    setMapCenter(coords);

    if (otherFilters[FILTER.TELECONSULTATION]) {
      query = `${query}&${FILTER.TELECONSULTATION}=true`;
    }
    if (otherFilters[FILTER.PUBLIC] !== PUBLIC.ADULTES_ADOS_ENFANTS) {
      query = `${query}&${FILTER.PUBLIC}=${otherFilters[FILTER.PUBLIC]}`;
    }
    axios.get(`/api/psychologists${query}`).then((response) => {
      setIsLoading(false);

      const refs = {};
      if (response.data && response.data.length) {
        setupMapAccordingToPsy(response.data[0].distance);
        response.data.forEach((x) => (refs[x.id] = createRef()));
        trackEventDirectorySearch({
          department: response.data[0].department || null,
          publicType: otherFilters[FILTER.PUBLIC],
          teleconsultation: otherFilters[FILTER.TELECONSULTATION],
        });
      } else {
        // todo: should display an error message
        setSelectedPsychologist(null);
        setPsychologists([]);
        setNoPsychologist(true);
        return;
      }
      psychologistsRefs.current = refs;
      if (resultsRef.current) {
        resultsRef.current.scrollTo({ top: 0 });
      }
      setSelectedPsychologist(null);
      setPsychologists(response.data);
    });
  };

  useEffect(() => {
    if (positionFilter === "Autour de moi") {
      return;
    }

    if (positionFilter && typeof positionFilter === "string") {
      setGeoLoading(true);
      axios
        .get(
          `https://api-adresse.data.gouv.fr/search/?q=${positionFilter}&postCode=${positionFilter}`
        )
        .then((response) => {
          const coordinates = response.data.features[0].geometry.coordinates;
          setCoords({
            latitude: coordinates[1],
            longitude: coordinates[0],
          });
          setGeoLoading(false);
        })
        .catch(() => {
          setGeoLoading(false);
        });
    } else if (Array.isArray(positionFilter)) {
      setCoords({
        latitude: positionFilter[1],
        longitude: positionFilter[0],
      });
    }
  }, [positionFilter]);

  return (
    <>
      <div className="fr-container fr-pt-7w">
        <h1>Trouver un psychologue partenaire près de chez soi.</h1>

        <SearchBar
          positionFilter={positionFilter}
          setPositionFilter={setPositionFilter}
          otherFilters={otherFilters}
          setOtherFilters={setOtherFilters}
          coords={coords}
          setCoords={setCoords}
          geoLoading={geoLoading}
          setGeoLoading={setGeoLoading}
          loadPsychologists={loadPsychologists}
        />
        <ResultWrapper className="fr-mb-8w">
          {noPsychologist && (
            <div className="fr-alert fr-alert--info fr-mb-4w" role="status">
              <p className="fr-alert__title">
                Pas encore de psychologues partenaires dans cette zone
              </p>
              <p>
                Nous mettons à jour cette liste régulièrement. N&apos;hésitez
                pas à dézoomer sur la carte (cliquer sur -) pour voir les
                psychologues proches de chez vous. A noter, certains
                psychologues acceptent les séances à distance après la première
                rencontre physique
              </p>
            </div>
          )}
          {psychologists?.length > 0 && (
            <Results
              psychologists={psychologists}
              resultsRef={resultsRef}
              psychologistsRefs={psychologistsRefs}
              selectedPsychologist={selectedPsychologist}
              setSelectedPsychologist={setSelectedPsychologist}
              mapCenter={mapCenter}
              setMapCenter={setMapCenter}
              mapZoom={mapZoom}
              setMapZoom={setMapZoom}
            />
          )}
          {isLoading && <Spinner />}
        </ResultWrapper>
      </div>
      <Footer />
    </>
  );
};

export default Directory;
