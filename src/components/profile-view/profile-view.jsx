import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import axios from 'axios';

import "../profile-view/profile-view.scss";

export class ProfileView extends React.Component {





  deregister(userName, token) {
    axios.delete(`https://movie-api-1.herokuapp.com/users/${userName}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      alert("User Deleted");
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userData');
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

    render() {  
      const { user, onBackClick, token} = this.props;
      return(
        <div>
          <div className="user">
          <span className="label">user: </span>
          <span className="value">{user.Username}</span>
          </div>

          <div className="user">
          <span className="label">password: </span>
          <span className="value">{user.Password}</span>
          </div>

          <div className="user">
          <span className="label">email: </span>
          <span className="value">{user.Email}</span>
          </div>

          <div className="user">
          <span className="label">Day born: </span>
          <span className="value">{user.Birthday}</span>
        </div>

        <div>
          <ul>
            {user.FavMovies.map((value, index) => {
            return <li key={index}>{value}</li>
            })}
          </ul>
        </div>
          <Button variant="info" className="my-3" onClick={()=>this.deregister(user.Username, token)}>Delete account</Button>
          <Button variant="info" className="my-3" onClick={()=>onBackClick()}>Back</Button>

      </div>

      );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired
  }),
}