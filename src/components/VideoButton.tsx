import React from "react";
import { Button } from "@dataesr/react-dsfr";

const VideoButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <Button
        size="lg"
        secondary
        icon="fr-fi-play-line"
        iconPosition="left"
        onClick={onClick}
        title="Découvrir MonPsy en vidéo"
      >
        Découvrir MonPsy en vidéo
      </Button>
      <span className="d-block">Durée&nbsp;: 2min</span>
    </>
  );
};

export default VideoButton;
