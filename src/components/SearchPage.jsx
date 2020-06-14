import React, { useState } from "react";
import Spotify from "spotify-web-api-js";
import { auth } from "../stores/auth";
import { findResultsTitle, gatherResultItemsArray } from "../utils/dataHandler";

const s = new Spotify();

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("album");
  const [searchTitle, setSearchTitle] = useState("");

  const onInputChange = (target) => {
    setSearchInput(target.value);
  };

  const onTypeChange = (target) => {
    setSearchType(target.value);
  };

  const onSearchClick = (event) => {
    event.preventDefault();
    s.setAccessToken(auth.access_token);
    console.log(searchInput);
    return s.search(searchInput, [searchType]).then((data) => {
      setSearchInput("");
      console.log(data);
      setSearchTitle(findResultsTitle(data));
      setSearchResults(gatherResultItemsArray(data));
    });
  };

  return (
    <div>
      <form>
        <label>
          search type <br />
          <label>
            album
            <input
              type="radio"
              id="searchType"
              value="album"
              checked={searchType === "album"}
              onChange={({ target }) => onTypeChange(target)}
            />
          </label>
          <label>
            artist
            <input
              type="radio"
              id="searchType"
              value="artist"
              checked={searchType === "artist"}
              onChange={({ target }) => onTypeChange(target)}
            />
          </label>
          <label>
            track
            <input
              type="radio"
              id="searchType"
              value="track"
              checked={searchType === "track"}
              onChange={({ target }) => onTypeChange(target)}
            />
          </label>
          <label>
            playlist
            <input
              type="radio"
              id="searchType"
              value="playlist"
              checked={searchType === "playlist"}
              onChange={({ target }) => onTypeChange(target)}
            />
          </label>
        </label>
      </form>
      <form>
        <label>
          search for something
          <input
            type="text"
            value={searchInput}
            onChange={(event) => onInputChange(event.target)}
          ></input>
        </label>
        <button onClick={onSearchClick}>search</button>
      </form>
      <section>
        <h2>{searchTitle}</h2>
        {searchResults.map((item) => {
          return <h4>{item.name}</h4>;
        })}
      </section>
    </div>
  );
};

export default SearchPage;
