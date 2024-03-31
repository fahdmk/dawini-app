const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const User = require('./Models/User');
const jwt = require('jsonwebtoken');
const app = express();
const Caretaker = require('./Models/Caretaker');
const PORT = process.env.PORT || 3000;

const sequelize = new Sequelize(
  'dawini4',
  'root',
  'fahd',
  {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
  }
);
app.use(cors());
app.use(bodyParser.json());

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });
 

app.post('/api/new-nurse', async (req, res) => {
  try {
    // Destructure user data from request body
    const {
      username,
      role,
      fullname,
      password,
      email,
      phone,
      working_Area,
      CIN,
      adress,
      cv
    } = req.body;

    // Check if username and role are provided
    if (!username || !role) {
      return res.status(400).json({ error: 'Username and role are required' });
    }

    // Create a new nurse record in the database using the Nurse model
    const newNurse = await Caretaker.create({
      username,
      role,
      fullName: fullname, 
      password,
      email,
      phone,
      working_Area,
      CIN,
      adress,
      cv
    });

    res.status(201).json(newNurse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating Nurse' });
  }
});
app.post('/api/new-user', async (req, res) => {
  try {
    // Destructure user data from request body
    const {
      username,
      role,
      fullname,
      password,
      email,
      phone,
      Adress,
      birthday
    } = req.body;

    // Check if username and role are provided
    if (!username || !role) {
      return res.status(400).json({ error: 'Username and role are required' });
    }

    // Create a new user record in the database
    const newUser = await User.create({
      username,
      role,
      fullname,
      password,
      email,
      phone,
      Adress,
      birthday
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
});
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are present in the request body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if the email exists in the User table
    let user = await User.findOne({ where: { email } });
    let userType = 'user';

    // If the email doesn't exist in the User table, check the Caretaker table
    if (!user) {
      user = await Caretaker.findOne({ where: { email } });
      userType = 'caretaker';
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    console.log('Entered password:', password);
    console.log('Stored hashed password:', user.password);
    
    // Compare the entered password with the stored hashed password
    const isPasswordValid = (password==user.password);

    console.log('Is password valid?', isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, userType },
      'your-secret-key',
      { expiresIn: '1h' }
    );

    console.log('Generated token:', token);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
});


app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const { username, email } = req.body;
  try {
    const newUser = await User.create({ username, email });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.get('/api/nurses', async (req, res) => {
  const nurses = await Caretaker.findAll();
  res.json(nurses);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://10.0.2.2:${PORT}`);
});
