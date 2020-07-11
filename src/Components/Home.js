import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import fetchData from "../api/FetchData";
// import './App.css';

const Home = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, error, profiles, hasMore } = fetchData(query, pageNumber);

  const observer = useRef();
  const lastProfileref = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  return (
    <div className="App">
      <input type="text" value={query} onChange={handleSearch}></input>
      {profiles.map((profile, index) => {
        if (profiles.length === index + 1)
          return (
            <div ref={lastProfileref} key={profile}>
              {profile.login}
            </div>
          );
        else {
          return (
            <Link to={`/${profile.id}`} key={index}>
              <div> {profile.login}</div>
            </Link>
          );
        }
      })}
      <div>{loading && "loading.."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
};

export default Home;
