import React from "react";

const VideoButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <button
        className="fr-btn fr-btn--lg fr-fi-play-line fr-btn--icon-left fr-btn--secondary fr-mt-2w"
        onClick={onClick}
      >
        Découvrir MonPsy en vidéo
      </button>
      <span className="d-block">Durée&nbsp;: 2min</span>
    </>
  );
};

export default VideoButton;
