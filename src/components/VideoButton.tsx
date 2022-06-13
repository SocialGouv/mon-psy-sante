import React from "react";

const VideoButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <button
        onClick={onClick}
        title="Découvrir MonPsy en vidéo"
        className="fr-btn fr-btn--lg fr-btn--secondary fr-fi-play-line fr-btn--icon-left"
      >
        Découvrir MonPsy en vidéo
      </button>
      <span className="d-block">Durée&nbsp;: 2min</span>
    </>
  );
};

export default VideoButton;
