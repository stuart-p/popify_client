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
import { SectionHeading } from "../../styles/text.style";
import SegmentedControl from "segmented-control/dist/SegmentedControl";
import { StyledButton, SearchForm, ResultsList } from "../../styles/ui.style";
import { SearchFooter } from "../../styles/containers.style";
import { observer } from "mobx-react";
import nextArrow from "../../images/next.png";

const s = new Spotify();

const SearchPage = observer(() => {
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
    setSearchType(target);
  };

  const onSearchClick = (event) => {
    event.preventDefault();
    s.setAccessToken(auth.access_token);
    return s.search(searchInput, [searchType]).then((data) => {
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
    return s
      .search(queryData.query, [queryData.type], options)
      .then((data) => {
        setSearchInput("");
        setSearchResults([]);
        setResultsTitle(findResultsTitle(data));
        setResultsType(findResultsType(data));
        setSearchResults(gatherResultItemsArray(data));
        setOffsetResultsQuery(determineNextAndPreviousSetSearchParams(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleLoginStatus(location);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchResults]);

  return auth.loggedIn ? (
    <main>
      <SectionHeading>Search For Music Info</SectionHeading>
      <SegmentedControl
        name="searchType"
        options={[
          { label: "Album", value: "album", default: true },
          { label: "Artist", value: "artist" },
          { label: "Track", value: "track" },
          { label: "Playlist", value: "playlist" },
        ]}
        setValue={(selectedValue) => onTypeChange(selectedValue)}
      />
      <SearchForm onSubmit={onSearchClick}>
        <input
          type="text"
          value={searchInput}
          aria-label="Search for song data"
          placeholder="Search for something..."
          onChange={(event) => onInputChange(event.target)}
        ></input>
        <StyledButton onClick={onSearchClick}>search</StyledButton>
      </SearchForm>
      <section>
        <h2>{resultsTitle}</h2>
        <ResultsList>
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
        </ResultsList>
      </section>
      <SearchFooter>
        <StyledButton
          onClick={() => fetchNextResultsSet(false)}
          disabled={!offsetResultsQuery.isPrevAvailable}
          swapImgOrientation
        >
          <img
            src={nextArrow}
            height={30}
            width={30}
            alt="previous search set"
          />
        </StyledButton>
        <StyledButton
          onClick={() => fetchNextResultsSet(true)}
          disabled={!offsetResultsQuery.isNextAvailable}
        >
          <img src={nextArrow} height={30} width={30} alt="next search set" />
        </StyledButton>
      </SearchFooter>
    </main>
  ) : (
    <Redirect noThrow to="/" />
  );
});

export default SearchPage;
