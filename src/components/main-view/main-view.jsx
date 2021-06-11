import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

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

      if (!register) return <RegistrationView SignIn={register => this.SignIn(register)} />; 

      /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
      if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;  
  
      if (movies.length === 0) return <div className="main-view" />;
  
      return (
        <div className="main-view">
          {selectedMovie
            ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
            ))
          }
        </div>
      );
    }
  
  }


                            
                              