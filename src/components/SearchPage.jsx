import React, { useState } from "react";
import Spotify from "spotify-web-api-js";
import { auth } from "../stores/auth";

const s = new Spotify();

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState({});
  const [searchInput, setSearchInput] = useState("");

  const onInputChange = (target) => {
    setSearchInput(target.value);
  };

  const onSearchClick = (event) => {
    event.preventDefault();
    s.setAccessToken(auth.access_token);
    console.log(searchInput);
    s.searchAlbums(searchInput).then((data) => {
      console.log(data);
    });
    setSearchInput("");
  };

  return (
    <div>
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
    </div>
  );
};

export default SearchPage;
