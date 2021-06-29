import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup'

import "../profile-view/profile-view.scss";

export class ProfileView extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      userName :"",
      password: "",
      birthday: "",
      email: ""

    };
  }

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

  updateUser(user, token)
  {
    axios.put(`https://movie-api-1.herokuapp.com/users/${user}`,
    {
      Username: this.state.userName,
      Password: this.state.password,
      Email: this.state.email,
      Birthday: this.state.birthday,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  )
    .then((response) => {
      const data = response.data;
      localStorage.setItem("user", data.Username);

      let userData = JSON.parse(localStorage.getItem('userData'));
      userData.Birthday = data.Birthday;
      userData.Email = data.Email;
      userData.Password = data.Password;
      localStorage.setItem('userData', JSON.stringify(userData))
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
  }
  

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

    render() {  
      const { user, onBackClick, token, FavMovies} = this.props;

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

          <div className="user">
          <span className="label">user: </span>
          <input className="value" name="userName" type="text" value={this.state.userName} onChange={(e) => this.handleChange(e)}/>
          </div>

          <div className="user">
          <span className="label">password: </span>
          <input className="value" name="password" type="text" value={this.state.password} onChange={(e) => this.handleChange(e)}/>
          </div>

          <div className="user">
          <span className="label">email: </span>
          <input className="value" name="email"  type="text" value={this.state.email} onChange={(e) => this.handleChange(e)}/>
          </div>

          <div className="user">
          <span className="label">Day born: </span>
          <input className="value" name="birthday" type="date" value={this.state.birthday} onChange={(e) => this.handleChange(e)}/>
        </div>


        <ListGroup>
        {user.FavMovies.map( (value, index) => (
          <ListGroup.Item key={index}>{value} </ListGroup.Item>
          ))}
        </ListGroup>
        
        

          <Button variant="info" className="my-3" onClick={()=>this.deregister(user.Username, token)}>Delete account</Button>
          <Button variant="info" className="my-3" onClick={()=>this.updateUser(user.Username, token)}>Update User</Button>
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


