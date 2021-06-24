import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import "./director-view.scss"

export class DirectorView extends React.Component {

  render() {

    const { director, onBackClick } = this.props;
    
    return (
    
    <div>
        <div className="director">
        <span className="label">Director: </span>
        <span className="value">{ director.Name }</span>
        </div>

        <div className="my-2">
        <span className="label font-weight-bold">Biography: </span>
        <span className="value">{ director.Bio }</span>
        </div>

        <Button variant="info" className="my-3" onClick={()=>onBackClick()}>Back</Button>
    </div>
    
    );
    }
    }

    DirectorView.propTypes = {
        director: PropTypes.shape({
          Name: PropTypes.string.isRequired,
          Bio: PropTypes.string.isRequired
        }),
        onBackClick: PropTypes.func.isRequired
      };