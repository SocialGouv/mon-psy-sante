import { Alert } from "@dataesr/react-dsfr";
import axios from "axios";
import { useRouter } from "next/router";
import React, { createRef, useEffect, useRef, useState } from "react";

import { Coordinates } from "../../types/coordinates";
import { FILTER } from "../../types/enums/filters";
import { PUBLIC } from "../../types/enums/public";
import { Psychologist as PsychologistType } from "../../types/psychologist";
import Spinner from "../Spinner";
import { ResultWrapper } from "./Directory.styles";
import Header from "./Header";
import Results from "./Results";
import SearchBar from "./SearchBar";

const Directory = () => {
  const router = useRouter();

  const currentPageRef = useRef(0);

  const [coords, setCoords] = useState<Coordinates>();
  const [geoLoading, setGeoLoading] = useState(false);

  const [psychologists, setPsychologists] = useState<PsychologistType[]>();
  const psychologistsRefs = useRef<any>();
  const resultsRef = useRef(null);
  const [selectedPsychologist, setSelectedPsychologist] = useState<number>();
  const [noPsychologist, setNoPsychologist] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mapCenter, setMapCenter] = useState<Coordinates>();

  const [positionFilter, setPositionFilter] = useState<any>("");
  const [otherFilters, setOtherFilters] = useState({
    [FILTER.TELECONSULTATION]: false,
    [FILTER.PUBLIC]: PUBLIC.BOTH,
  });

  const loadMorePsychologists = () => {
    loadPsychologists(currentPageRef.current + 1);
    currentPageRef.current = currentPageRef.current + 1;
  };

  const loadPsychologists = (currentPage) => {
    let query = `?${FILTER.PAGE_INDEX}=${currentPage}`;
    setNoPsychologist(false);
    setIsLoading(true);
    setPsychologists([]);

    query = `${query}&${FILTER.LONGITUDE}=${coords.longitude}&${FILTER.LATITUDE}=${coords.latitude}`;
    setMapCenter(coords);

    if (otherFilters[FILTER.TELECONSULTATION]) {
      query = `${query}&${FILTER.TELECONSULTATION}=true`;
    }
    if (otherFilters[FILTER.PUBLIC] !== PUBLIC.BOTH) {
      query = `${query}&${FILTER.PUBLIC}=${otherFilters[FILTER.PUBLIC]}`;
    }
    axios.get(`/api/psychologists${query}`).then((response) => {
      setIsLoading(false);
      if (currentPage === 0) {
        const refs = {};
        if (!response.data.length) {
          setNoPsychologist(true);
          return;
        }
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
    });
  };

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_NEW_FEATURES !== "true") {
      router.push("/");
    }
  }, []);

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
        });
    } else if (positionFilter) {
      setCoords({
        latitude: positionFilter[1],
        longitude: positionFilter[0],
      });
    }
  }, [positionFilter]);

  return (
    <>
      <Header />

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
        {psychologists?.length > 0 && (
          <Results
            loadMorePsychologists={loadMorePsychologists}
            psychologists={psychologists}
            resultsRef={resultsRef}
            psychologistsRefs={psychologistsRefs}
            selectedPsychologist={selectedPsychologist}
            setSelectedPsychologist={setSelectedPsychologist}
            mapCenter={mapCenter}
            setMapCenter={setMapCenter}
          />
        )}
        {isLoading && <Spinner />}

        {noPsychologist && (
          <Alert
            title="Pas encore de psycologues disponibles dans cette zone"
            className="fr-mt-1w"
            description="Nous mettons à jour cette liste régulièrement."
          />
        )}
      </ResultWrapper>
    </>
  );
};

export default Directory;
