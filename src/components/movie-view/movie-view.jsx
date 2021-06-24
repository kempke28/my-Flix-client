import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (

    <Card className="movie-card" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </Card.Text>
        <Card.Text>
          <span>Genre: </span>
          <Link to={`/genre/${movie.Genre.Name}`}>{ movie.Genre.Name }</Link>
          </Card.Text>
        <Card.Text>
          <span>Director: </span>
          <Link to={`/director/${movie.Director.Name}`}>{ movie.Director.Name }</Link>
        </Card.Text>

        <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>

      </Card.Body>
    </Card>
    )
  } 
}


MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired
};
  


/*
                            "Genre": {
                                "Name": "Genre type",
                                "Description": "a small description of the genre"
                            },
                            "Director": {
                                "Name": "name director",
                                "Bio": "Small Bio from director"
                            },
                            "_id": "60a8cd5037f59be3e29b1c9e", Normally generated when movie is created ramdonly
                            "Title": "movie name",
                            "Description": "description from the movie, or sinopsis",
                            "ImagePath": "link to the image",
                            "ForKids": true,
                            "featured": "if its featured in cinemas or not"
*/