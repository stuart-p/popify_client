import React from "react";
import { fetchThumbnailImgUrl } from "../../utils/dataHandler";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { ResultItemCard } from "../../styles/ui.style";

const TrackCard = (props) => {
  const imgURL = fetchThumbnailImgUrl(props.img);
  return (
    <ResultItemCard>
      <LazyLoadImage
        alt="album artwork"
        height={150}
        width={150}
        src={imgURL}
        effect="opacity"
      />
      <h4>{props.name}</h4>
      <h5>{props.artist}</h5>
    </ResultItemCard>
  );
};

export default TrackCard;
