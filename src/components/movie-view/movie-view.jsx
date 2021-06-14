import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>

       </div>
    );
  }
}  
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
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