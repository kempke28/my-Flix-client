  
import React, {useState} from "react";
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export function RegistrationView(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthDate);
        props.SignIn(username);
      }

      return (
        <div>

          <h1>Sign In</h1>
          
          <Form>

            <Form.Group controlId="formUsername">
              <Form.label>Username:</Form.label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.label>Password:</Form.label>
              <Form.Control type="text" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.label>email</Form.label>
              <Form.Control type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="Birth date">
              <Form.label>Birth Date</Form.label>
              <Form.Control type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)}></Form.Control>
            </Form.Group>
            
            <div className="mb-2">
              <Button variant="primary" size="lg">Submit</Button>
            </div>

          </Form>

        </div>
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
