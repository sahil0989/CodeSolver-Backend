const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const express = require("express");
const path = require("path");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    // res.status(400).json({ msg: 'credentials not fulfilled ' });
    res.writeHead(301,
      { Location: 'https://codesolver.vercel.app/credentialsError.html' }
    );
    res.end();
  }

  const duplicateUsername = await User.findOne({ username });
  if (duplicateUsername) {
    // res.status(409).json({ msg: 'Please use an unique username' });
    res.writeHead(301,
      { Location: 'https://codesolver.vercel.app/usernameError.html' }
    );
    res.end();
  }

  // const duplicateEmail = await User.findOne({ username });
  // if (duplicateEmail) {
  //   res.status(409).json({ msg: 'Please use an unique email' });
  //   res.writeHead(301,
  //     { Location: 'https://codesolver.vercel.app/emailError.html' }
  //   );
  //   res.end();
  // }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    ...req.body,
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { id: user._id, email, username },
    process.env.SecretKey
  );

  try {
    res.writeHead(301,
      { Location: 'https://codesolver.vercel.app/Home.html' }
    );
    res.end();


  } catch (error) {
    res.status(400).send(error);
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    // res.status(400).json({ msg: 'Email does not exist' });
    res.writeHead(301,
      { Location: 'https://codesolver.vercel.app/emailLoginError.html' }
    );
    res.end();
  }

  const verPass = bcrypt.compareSync(password, user.password);
  if (!verPass) {
    // res.status(400).json({ msg: 'Password is wrong' });
    res.writeHead(301,
      { Location: 'https://codesolver.vercel.app/passwordError.html' }
    );
    res.end();
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    process.env.SecretKey
  );

  try {
    res.writeHead(301,
      { Location: 'https://codesolver.vercel.app/Home.html' }
    );
    res.end();

  } catch (error) {
    res.status(400).send(error);
  }
};








module.exports = { register, login };