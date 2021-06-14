import React, { useState } from 'react';
import PropTypes from 'prop-types';
;import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    //Creating nice box username with Bootsap
    <Form>

      <Form.Group controlId="formUsername">
        <Form.label>Username:</Form.label>
        <From.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlID="formPassword">
        <Form.label>Password:</Form.label>
        <From.Control> type="password" value={password} onChange={e => setPassword(e.target.value)} </From.Control>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>

    </Form>
  );
}


LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
