import React, { useState, useEffect } from "react";
import Spotify from "spotify-web-api-js";
import { useLocation, Redirect } from "@reach/router";
import { auth } from "../../stores/auth";
import { handleLoginStatus } from "../../utils/loginHandler";
import {
  findResultsTitle,
  gatherResultItemsArray,
  findResultsType,
  determineNextAndPreviousSetSearchParams,
} from "../../utils/dataHandler";
import ArtistCard from "./ArtistCard";
import AlbumCard from "./AlbumCard";
import TrackCard from "./TrackCard";
import PlaylistCard from "./PlaylistCard";
import SearchTypeSelector from "./SearchTypeSelector";

const s = new Spotify();

const SearchPage = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("album");
  const [resultsTitle, setResultsTitle] = useState("");
  const [resultsType, setResultsType] = useState("");
  const [offsetResultsQuery, setOffsetResultsQuery] = useState({
    isPrevAvailable: false,
    isNextAvailable: false,
    prev: {},
    next: {},
  });

  const onInputChange = (target) => {
    setSearchInput(target.value);
  };

  const onTypeChange = (target) => {
    setSearchType(target.value);
  };

  const onSearchClick = (event) => {
    event.preventDefault();
    s.setAccessToken(auth.access_token);
    return s.search(searchInput, [searchType]).then((data) => {
      console.log(data);
      setSearchInput("");
      setSearchResults([]);
      setResultsTitle(findResultsTitle(data));
      setResultsType(findResultsType(data));
      setSearchResults(gatherResultItemsArray(data));
      setOffsetResultsQuery(determineNextAndPreviousSetSearchParams(data));
    });
  };

  const fetchNextResultsSet = (isNext) => {
    const queryData = isNext
      ? offsetResultsQuery.next
      : offsetResultsQuery.prev;
    const options = {
      limit: queryData.limit,
      offset: queryData.offset,
    };

    s.setAccessToken(auth.access_token);
    return s.search(queryData.query, [queryData.type], options).then((data) => {
      console.log(data);
      setSearchInput("");
      setSearchResults([]);
      setResultsTitle(findResultsTitle(data));
      setResultsType(findResultsType(data));
      setSearchResults(gatherResultItemsArray(data));
      setOffsetResultsQuery(determineNextAndPreviousSetSearchParams(data));
    });
  };

  handleLoginStatus(location);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchResults]);

  return auth.loggedIn ? (
    <>
      <main>
        <h2>Search For Music Info</h2>
        <SearchTypeSelector
          onTypeChange={onTypeChange}
          searchType={searchType}
        />
        <form onSubmit={onSearchClick}>
          <input
            type="text"
            value={searchInput}
            aria-label="Search for song data"
            placeholder="Search for something..."
            onChange={(event) => onInputChange(event.target)}
          ></input>
          <button onClick={onSearchClick}>search</button>
        </form>
        <section>
          <h2>{resultsTitle}</h2>
          <ul>
            {searchResults.map((item) => {
              switch (resultsType) {
                case "artists":
                  return (
                    <ArtistCard
                      key={item.id}
                      name={item.name}
                      img={item.images}
                    />
                  );
                case "albums":
                  return (
                    <AlbumCard
                      key={item.id}
                      name={item.name}
                      img={item.images}
                      artist={item.artists[0].name}
                    />
                  );
                case "tracks":
                  return (
                    <TrackCard
                      key={item.id}
                      name={item.name}
                      img={item.album.images}
                      artist={item.artists[0].name}
                    />
                  );
                case "playlists":
                  return (
                    <PlaylistCard
                      key={item.id}
                      name={item.name}
                      img={item.images}
                      owner={item.owner.display_name}
                    />
                  );
                default:
                  return <></>;
              }
            })}
          </ul>
        </section>
      </main>
      <footer>
        <button onClick={() => fetchNextResultsSet(false)}>previous</button>
        <button onClick={() => fetchNextResultsSet(true)}>next</button>
      </footer>
    </>
  ) : (
    <Redirect noThrow to="/" />
  );
};

export default SearchPage;
