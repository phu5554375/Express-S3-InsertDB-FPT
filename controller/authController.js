const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const users = require('./users');

dotenv.config();
const register = async (req, res) => {
    const { username, password } = req.body;
  
    // Check if the user already exists
    const userExists = users.find((user) => user.username === username);
    if (userExists) {
      return res.status(400).send('User already exists');
    }
  
    // Hash the password
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // Store the user
    const newUser = { username, password: hashedPassword };
    users.push(newUser);
  
    res.status(201).send('User registered successfully');
  };

  const authenticate = async (req, res) => {
    const { username, password } = req.body;
  
    // Find the user
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials');
    }
  
    // Create a JWT
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
  
    res.status(200).json({ token });
  };

  module.exports = {
  register,
  authenticate,
};