import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import fetchData from '../api/FetchData';
import { Container, Row, Col } from 'react-bootstrap';
import './Home.css';

const Home = () => {
	const [query, setQuery] = useState('');
	const [pageNumber, setPageNumber] = useState(1);

	
	const { loading, profiles, hasMore } = fetchData(query, pageNumber);

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
			<div className='main-container1'>
					<div className='header'>
						<img
							src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.kjCUP06WDUMR88i5wo2SqwHaHa%26pid%3DApi&f=1"
							alt="logo"
							height="50px"
							width="50px"
						></img>
				
						<h2 className='mt-2 ml-1'>Github Profile Viewer</h2>
					</div>
				
				
					<div>
						<input
							className="search"
							placeholder="User Name"
							type="text"
							value={query}
							onChange={handleSearch}
						></input>
					</div>
				
				
						<Container fluid>
							<Row className="justify-content-md-center">
								{profiles.map((profile, index) => {
									if (profiles.length === index + 1)
										return (
											<Link ref={lastProfileref} to={`/${profile.id}`} key={index}>
												<Col md="12" className="profile">
													<Row>
														<Col md="auto" xs="auto">
															<img
																src={profile.avatar_url}
																alt="repo"
																className="profileimage"
															></img>
														</Col>
														<Col md="auto" xs="auto">
															<h4 className='mt-4'>{profile.login}</h4>
														</Col>
													</Row>
												</Col>
											</Link>
										);
									else {
										return (
											<Link to={`/${profile.id}`} key={index}>
												<Col md="12" className="profile">
													<Row>
														<Col md="auto" xs="auto">
															<img
																src={profile.avatar_url}
																alt="repo"
																className="profileimage"
															></img>
														</Col>
														<Col md="auto" xs="auto">
															<h4 className='mt-4'>{profile.login}</h4>
														</Col>
													</Row>
												</Col>
											</Link>
										);
									}
								})}
							</Row>
						</Container>
			</div>
			<div>{!loading && 'loading..'}</div>
		</div>
	);
};

export default Home;
