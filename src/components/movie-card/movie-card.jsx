import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    featured: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
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