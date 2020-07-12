import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import FetchUser from '../api/FetchUser';
import FetchRepo from '../api/FetchRepo';
import FetchFollowers from '../api/FetchFollowers';
import './user.css';

const User = ({ match }) => {
	const { user, loading } = FetchUser(match.params.id);
	const { repos } = FetchRepo(user.repos_url);
	const { followersCount } = FetchFollowers(user.followers_url);

	// console.log(User.props.match)

	return (
		<div>
			<Link to="/" className='h5 ml-4'> <img src="https://img.icons8.com/flat_round/64/000000/back--v1.png"height='40px' className='mt-2' alt='back'></img></Link>

			<h2>{loading && 'Loading....'}</h2>
			<div>
				{!loading && (
					<Container className="main-container">
						<Row className="pt-4 pb-4" style={{ backgroundColor: '#e1e1e1' }}>
							<Col>
								<Row>
									<Col md="auto">
										<img src={user.avatar_url} alt="Profile pic" className="profilepic"></img>
									</Col>

									<Col>
										<h2 className="mt-4">{user.name}</h2>
										<h4>@{user.login}</h4>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col>
								<h4 className="mt-4">Bio</h4>
								<p>{user.blog || '-'}</p>
								<h4>Works at</h4>
								<p>{user.company || '-'}</p>
								<Row>
									<Col>
										<h4>Repositories</h4>
										<p>{repos.length}</p>
									</Col>
									<Col>
										<h4>Followers</h4>
										<p>{followersCount}</p>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col>
								<h3>Repositories</h3>
								{repos.map((repo, index) => {
									return (
										<div className="mt-4" key={index}>
											<Container className="repo">
												<Row className="justify-content-md-center">
													<Col md="auto">
														<img
															src={repo.owner.avatar_url}
															alt="repo"
															className="repoimage"
														></img>
													</Col>
													<Col>
														<h4>{repo.full_name}</h4>
														<p>{repo.description}</p>
													</Col>
												</Row>
											</Container>
										</div>
									);
								})}
							</Col>
						</Row>
					</Container>
				)}
			</div>
		</div>
	);
};
export default User;
