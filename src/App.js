import React from "react";
import { Router } from "@reach/router";

import "./App.css";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import SearchPage from "./components/Search/SearchPage";

function App() {
  return (
    <>
      <Header />
      <Router>
        <LandingPage path="/" />
        <SearchPage path="/search" />
      </Router>
    </>
  );
}

export default App;
