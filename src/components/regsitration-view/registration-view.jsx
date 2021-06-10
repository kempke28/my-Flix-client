  
import React from "react";
import PropTypes from 'prop-types';

export function RegistrationView() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthdate);
        props.onRegister(username);
      }

      return (
        <form>
          <label>
            Username:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <label>
            email:
            <input type="password" value={password} onChange={e => setEmail(e.target.value)} />
          </label>
          <label>
            birthdate:
            <input type="password" value={password} onChange={e => setBirthdate(e.target.value)} />
          </label>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      );
    }

    RegistrationView.propTypes = {
        SignIn: PropTypes.func.isRequired
      };

/*
      "Username": "username string",
                            "Password": "password example",
                            "Email": "domidomiddomi@mail.com",
                            "Birthday": "1990/01/01" (date format),
                            "FavMovies" : []

                            */
