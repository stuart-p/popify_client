import React from "react";
import { TypeSelectorForm } from "../../styles/ui.style";

const SearchTypeSelector = (props) => {
  return (
    <TypeSelectorForm>
      <label htmlFor="album">album</label>
      <input
        type="radio"
        id="searchType"
        value="album"
        checked={props.searchType === "album"}
        onChange={({ target }) => props.onTypeChange(target)}
      />
      <label htmlFor="artist">artist</label>
      <input
        type="radio"
        id="searchType"
        value="artist"
        checked={props.searchType === "artist"}
        onChange={({ target }) => props.onTypeChange(target)}
      />
      <label htmlFor="track">track</label>
      <input
        type="radio"
        id="searchType"
        value="track"
        checked={props.searchType === "track"}
        onChange={({ target }) => props.onTypeChange(target)}
      />
      <label htmlFor="playlist">playlist</label>
      <input
        type="radio"
        id="searchType"
        value="playlist"
        checked={props.searchType === "playlist"}
        onChange={({ target }) => props.onTypeChange(target)}
      />
    </TypeSelectorForm>
  );
};

export default SearchTypeSelector;
