import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import { Navbar, Container, Nav, Row, Col  } from 'react-bootstrap';

import './main-view.scss';


export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
          movies: [
          ],
          selectedMovie: null,
          user: null,
          register: false
        };
      }

      componentDidMount(){
        axios.get('https://movie-api-1.herokuapp.com/movies')  
          .then(response => {
            this.setState({
              movies: response.data
            });
          })
          .catch(error => {
            console.log(error);
          });
      }

        /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

        setSelectedMovie(movie) {
          this.setState({
            selectedMovie: movie
          });
        }

        /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

        onLoggedIn(user) {
          this.setState({
            user
          });
        }

        /*When a new user is registered  */

        SignIn(register) {
          this.setState({
            register
          });
        }

    render() {
      const { movies, selectedMovie, register, user} = this.state;

      if (!register) return (
        (
        <Row className='justify-content-md-center'>
          <Col md={6}>
            <RegistrationView SignIn={register => this.SignIn(register)} />;
            </Col>
        </Row>
        ));
       

      /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
      if (!user) return (
      (
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />; 
        </Col>
      </Row>
      ));
  
      if (movies.length === 0) return <div className="main-view" />;
  
      return (
      
      <div>

        <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="#home">My-Flix movies</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Movies</Nav.Link>
            <Nav.Link href="#features">User account</Nav.Link>
          </Nav>
          </Container>
        </Navbar>

        
        <Row className="justify-content-md-center">
          {selectedMovie
            ? (
              <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
            )
            
            : movies.map(movie => (
              <Col md={4}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              </Col>
            ))
          }
        </Row>

        </div>
        
      );
    }
  
  }


                            
                              