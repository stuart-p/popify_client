import React from "react";
import { fetchThumbnailImgUrl } from "../../utils/dataHandler";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const PlaylistCard = (props) => {
  const imgURL = fetchThumbnailImgUrl(props.img);
  return (
    <li>
      <LazyLoadImage
        alt="playlist mosaic"
        height={150}
        width={150}
        src={imgURL}
        effect="opacity"
      />
      <h4>{props.name}</h4>
      <h5>{props.owner}</h5>
    </li>
  );
};

export default PlaylistCard;
