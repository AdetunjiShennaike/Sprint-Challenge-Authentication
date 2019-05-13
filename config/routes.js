const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../database/models/authModel')
const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const { username, password } = req.body
  const user = { username, password }
  
  const hash = bcrypt.hashSync(user.password, 8) 
  user.password = hash

  Users
  .insert(user)
  .then( newUser => {
    res.status(201).json(newUser)
  })
  .catch( err => {
    return res.status(500).json( err )
  })
}

function login(req, res) {
  // implement user login
  const { username, password } = req.body

  Users
  .getByUser( username )
  .then( user => {
    if ( user && bcrypt.compareSync(password, user.password)) {
      const token = makeToken(user)
      res.status(200).json({
        message: `Welcome ${user.username}`, 
        token
      })
    }
    else {
      return res.status(401).json({ message: 'try again' })
    }
  })
  .catch( err => {
    return res.status(500).json( err );
  })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

//token function
function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['standard', 'student']
  }
  const secret = process.env.JWT_SECRET
  const options = { 
    expiresIn: '20h'
  }

  return jwt.sign(payload, secret, options)
}