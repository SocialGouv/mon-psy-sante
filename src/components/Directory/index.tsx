import axios from "axios";
import { useRouter } from "next/router";
import React, { createRef, useEffect, useRef, useState } from "react";

import { Coordinates } from "../../types/coordinates";
import { FILTER } from "../../types/enums/filters";
import { PUBLIC } from "../../types/enums/public";
import { Psychologist as PsychologistType } from "../../types/psychologist";
import { DirectoryWrapper, ResultWrapper } from "./Directory.styles";
import Header from "./Header";
import ResultsDesktop from "./ResultsDesktop";
import ResultsMobile from "./ResultsMobile";
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
    if (coords) {
      query = `${query}&${FILTER.LONGITUDE}=${coords.longitude}&${FILTER.LATITUDE}=${coords.latitude}`;
      setMapCenter(coords);
    }

    if (otherFilters[FILTER.TELECONSULTATION]) {
      query = `${query}&${FILTER.TELECONSULTATION}=true`;
    }
    if (otherFilters[FILTER.PUBLIC] !== PUBLIC.BOTH) {
      query = `${query}&${FILTER.PUBLIC}=${otherFilters[FILTER.PUBLIC]}`;
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
    <DirectoryWrapper>
      <Header />
      <ResultWrapper>
        <SearchBar
          positionFilter={positionFilter}
          setPositionFilter={setPositionFilter}
          otherFilters={otherFilters}
          setOtherFilters={setOtherFilters}
          coords={coords}
          setCoords={setCoords}
          geoLoading={geoLoading}
          setGeoLoading={setGeoLoading}
          loadMorePsychologists={loadMorePsychologists}
          loadPsychologists={loadPsychologists}
        />
        {psychologists && psychologists.length > 0 && (
          <>
            <ResultsDesktop
              loadMorePsychologists={loadMorePsychologists}
              psychologists={psychologists}
              resultsRef={resultsRef}
              psychologistsRefs={psychologistsRefs}
              selectedPsychologist={selectedPsychologist}
              setSelectedPsychologist={setSelectedPsychologist}
              mapCenter={mapCenter}
              setMapCenter={setMapCenter}
            />
            <ResultsMobile
              psychologists={psychologists}
              mapCenter={mapCenter}
            />
          </>
        )}
      </ResultWrapper>
    </DirectoryWrapper>
  );
};

export default Directory;
