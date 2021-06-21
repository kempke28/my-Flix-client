import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'
import axios from 'axios';

import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {

  addFavoriteMovie(userData, token, movie) {
    axios.patch(`https://movie-api-1.herokuapp.com/users/${userData.Username}/movies/${movie._id}`, 
    { 
      Username: userData.Username
    },
    {
      headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}`}
    })
    .then(response => {
      alert("movie added");
    })
    .catch(function (error) {
      console.log(error);
    });
}

  render() {
    const { movie, userData, token } = this.props;

    return (
      <CardDeck>
        <Card className="movie-card" style={{ width: '18rem' }}>
          <Card.Header>{movie.Title}</Card.Header>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}></Link>
            <Button variant="link">Open</Button>
            <Button onClick={()=>this.addFavoriteMovie(userData, token, movie)}>Add to your favorites</Button>
          </Card.Body>
        </Card>
      </CardDeck>
  );
}
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func
};
