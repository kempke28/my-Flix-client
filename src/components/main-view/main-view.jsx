import React from 'react';
import axios from 'axios';
 
//Which link?????????
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';

import { Navbar, Container, Nav, Row, Col  } from 'react-bootstrap';

import './main-view.scss';


export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null,
      userData: null,
      token: null
      //register: false
    };
  }

  getMovies(token) {
    axios.get('https://movie-api-1.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        userData: JSON.parse(localStorage.getItem('userData')),
        token: localStorage.getItem('token')
      });
      this.getMovies(accessToken);
      
    }
  }

  getAccount(token, user) {
    axios.get(`https://movie-api-1.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log('Success');
      this.setState({
        userData: response.data
      });
      localStorage.setItem('userData', JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getAccount(authData.token, authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

    /* Should this stay????? When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

    setSelectedMovie(movie) {
      this.setState({
        selectedMovie: movie
      });
    }

    /*When a new user is registered  */

    // SignIn(register) {
    //   this.setState({
    //     register
    //   });
    // }

        //check path="/" can I add path="/movies"
    render() {

      const { movies, user, userData, token} = this.state;
      
      return (
        
        <Router>

        <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/">Movies</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/movies">Movies</Nav.Link>
            <Nav.Link href="/user">User account</Nav.Link>
            {!user && <Nav.Link href="/register">Register</Nav.Link>}   
            {user == null ?
            <Nav.Link href="/login">Log In</Nav.Link>:
            <Nav.Link href="#logout">Log Out</Nav.Link>}
                    
          </Nav>
          </Container>
        </Navbar>


        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {

            if (!user) return 
            <Col md={8}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
            
            <Col md={3} key={m._id}>
                <MovieCard movie={m}  token={token} userData={userData}/>
              </Col>
            ))
          }} 
          />

          <Route path="/login" render={() => {
            if (user) return <Redirect to="/" />
            return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            )}} 
            />
      
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return (
            <Col>
              <RegistrationView />
            </Col>
            )}}
          />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return 
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return (
            <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
            )}} />



          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return 
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return (
            <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
            )}} 
            />


          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return (
            <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
            )}} />

          <Route path="/user" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return (
            <Col md={8}>
              <ProfileView user={userData} token={token} onBackClick={() => history.goBack()} />
            </Col>
            )}} />
        
        
        </Row>
      </Router>
    );
  }
}