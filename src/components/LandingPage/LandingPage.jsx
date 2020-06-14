import { useLocation, Link } from "@reach/router";
import React from "react";
import { Observer } from "mobx-react";
import { auth } from "../../stores/auth.js";
import { handleLoginStatus } from "../../utils/loginHandler";
import {
  SectionHeading,
  SectionPara,
  ParaHeading,
} from "../../styles/text.style.js";

const LandingPage = () => {
  const location = useLocation();
  handleLoginStatus(location);

  return (
    <main>
      <SectionHeading>A Spotify Search API</SectionHeading>
      <ParaHeading>What is this site?</ParaHeading>
      <SectionPara>
        This is a portfolio site created by Stuart Palmer in June 2020, as a
        demonstration tool of OAuth 2.0 and API consumption. Please feel free to
        browse my other work or contact me through my portfolio page{" "}
        <a href="https://stuart-p.github.io">HERE</a>.
      </SectionPara>
      <ParaHeading>What does it do?</ParaHeading>
      <SectionPara>
        Users can log into this site with their Spotify credentials, using OAuth
        2.0. Once logged in, users can search the Spotify catalog of songs,
        artists, albums and playlists.
      </SectionPara>
    </main>
  );
};

export default LandingPage;
