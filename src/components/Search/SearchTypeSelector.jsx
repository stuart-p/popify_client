import React from "react";

const SearchTypeSelector = (props) => {
  return (
    <form>
      <label>
        search type <br />
        <label>
          album
          <input
            type="radio"
            id="searchType"
            value="album"
            checked={props.searchType === "album"}
            onChange={({ target }) => props.onTypeChange(target)}
          />
        </label>
        <label>
          artist
          <input
            type="radio"
            id="searchType"
            value="artist"
            checked={props.searchType === "artist"}
            onChange={({ target }) => props.onTypeChange(target)}
          />
        </label>
        <label>
          track
          <input
            type="radio"
            id="searchType"
            value="track"
            checked={props.searchType === "track"}
            onChange={({ target }) => props.onTypeChange(target)}
          />
        </label>
        <label>
          playlist
          <input
            type="radio"
            id="searchType"
            value="playlist"
            checked={props.searchType === "playlist"}
            onChange={({ target }) => props.onTypeChange(target)}
          />
        </label>
      </label>
    </form>
  );
};

export default SearchTypeSelector;
