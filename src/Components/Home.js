import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import fetchData from "../api/FetchData";
import { Container, Row, Col, Card,CardColumns } from "react-bootstrap";
import './Home.css';

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
      <Container>
        <Row>
          <Col>
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.kjCUP06WDUMR88i5wo2SqwHaHa%26pid%3DApi&f=1"
              alt="logo"
              height="50px"
              width="50px"
            ></img>
          </Col>
          <Col>
            <h2>Github Profile Viewer</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <input type="text" value={query} onChange={handleSearch}></input>
          </Col>
        </Row>
        <Row>
          <Col>
          <CardColumns>
            {profiles.map((profile, index) => {
              if (profiles.length === index + 1)
                return (
                  <div ref={lastProfileref} key={profile}>
                    {profile.login}
                  </div>
                );
              else {
                return (
                    <Card style={{ width: "18rem" }}>
                  <Link className='users' to={`/${profile.id}`} key={index}>
                      <Card.Img variant="top" src={profile.avatar_url} height=
                      'auto' width='100px' />
                      <Card.Body>
                        <Card.Title>{profile.login}</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </Card.Text>
                      </Card.Body>
                  </Link>
                    </Card>
                );
              }
            })}
            </CardColumns>
            <div>{loading && "loading.."}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
