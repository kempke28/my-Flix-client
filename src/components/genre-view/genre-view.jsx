import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import "./genre-view.scss"

export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick } = this.props;
        
        return (
    
    
    <div className="genre-view">
        <div className="my-2">
          <span className="label font-weight-bold">Genre: </span>
          <span className="value">{genre.Name}</span>
        </div>

        <div className="my-2">
          <span className="label font-weight-bold">Description: </span>
          <span className="value">{genre.Description}</span>
        </div>
          <Button variant="info" className="my-3" onClick={()=>onBackClick()}>Back</Button>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
  })
};