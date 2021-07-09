import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';

import { Navbar, Container, Nav, Row, Col  } from 'react-bootstrap';

import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import './main-view.scss';


class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
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
      this.props.setMovies(
        response.data
      );
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
      this.props.setUser(response.data);
      localStorage.setItem('userData', JSON.stringify(response.data));
      })
    .catch(function (error) {
      console.log(error);
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('userData', JSON.stringify(authData.user));
    this.props.setUser(authData.token, authData.user.Username);  //this.setState
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser({  //this.setState
      user: null
    });
  }


  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }


  render() {

  const { movies } = this.props;
  const { user, userData, token, onLoggedOut } = this.state;
  
  return (
    
    <Router>

      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/">Movies</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Movies</Nav.Link>
          <Nav.Link href="/user">User account</Nav.Link>
          {!user && <Nav.Link href="/register">Register</Nav.Link>}   
          {user == null ?
          <Nav.Link href="/login" >Log In</Nav.Link>: 
          <Nav.Link href="#logout" onClick={() => this.onLoggedOut(null)}>Log Out</Nav.Link>}               
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
          return <MoviesList movies={movies}/>;
          
          <Col md={3} key={m._id}>
              <MovieCard movie={m}  token={token} userData={userData}/>
          </Col>
          
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



        <Route path="/director/:name" render={({ match, history }) => {
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


        <Route path="/genre/:name" render={({ match, history }) => {
          if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
          if (movies.length === 0) return <div className="main-view" />;
          return (
          <Col md={8}>
            <GenreView Genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
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

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

  export default connect(mapStateToProps, { setMovies, setUser } )(MainView);