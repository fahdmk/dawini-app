const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const User = require('./Models/User');
const jwt = require('jsonwebtoken');
const app = express();
const Caretaker = require('./Models/Caretaker');
const Review = require('./Models/Review'); 
const Appointment = require('./Models/appointment'); 
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
const corsOptions = {
  origin: 'http://localhost:3001',  
  credentials: true, 
  optionsSuccessStatus: 200  
};

app.use(cors(corsOptions));
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });
  app.get('/api/users/sorted-by-appointments', async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{
                model: Appointment,
                as: 'PatientAppointments',
                attributes: [] 
            }],
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('PatientAppointments.idAppointment')), 'appointmentCount']
                ]
            },
            group: ['User.idUser'],  
            order: [[sequelize.literal('appointmentCount'), 'DESC']],
        });

        res.json(users);
    } catch (error) {
        console.error('Failed to fetch users sorted by appointment count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

  app.post('/api/appointments/update-price', async (req, res) => {
    const { idAppointment, Price } = req.body;

    if (!idAppointment || Price === undefined) {
        return res.status(400).json({ error: 'Missing required fields: idAppointment and Price' });
    }

    try {
        const appointment = await Appointment.findByPk(idAppointment);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        appointment.Price = Price;
        await appointment.save();
        res.json({ message: 'Appointment price updated successfully', appointment });
    } catch (error) {
        console.error('Error updating appointment price:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/api/appointments/accepted-total-price', async (req, res) => {
  try {
    const totalAcceptedPrice = await Appointment.sum('Price', {
      where: { status: 'accepted' }
    });

    if (isNaN(totalAcceptedPrice)) {
      return res.status(404).json({ error: 'No accepted appointments found' });
    }

    res.json({ totalAcceptedPrice });
  } catch (error) {
    console.error('Error calculating total accepted appointment prices:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/caretaker/count', async (req, res) => {
  try {
      const count = await Caretaker.count();
      res.json({ totalnurses: count });
  } catch (error) {
      console.error('Failed to fetch caretaker count:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/users/count', async (req, res) => {
  try {
      const count = await User.count();
      res.json({ totalUsers: count });
  } catch (error) {
      console.error('Failed to fetch user count:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
  app.get('/api/appointments', async (req, res) => {
    try {
        const { userId, role } = req.query;

        if (!userId || !role) {
            return res.status(400).json({ error: 'userId and role are required' });
        }

        let appointments;

        if (role === 'patient') {
            appointments = await Appointment.findAll({
                where: { User_idUser: userId },
                include: [
                    { model: User, as: 'Patient', attributes: ['idUser', 'fullName', 'email','photo_uri'] },
                    { model: Caretaker, as: 'Caretaker', attributes: ['idCare taker', 'fullName', 'photo_uri'] } 
                ]
            });
        } else if (role === 'nurse') {
            appointments = await Appointment.findAll({
                where: { IdCareTaker: userId },
                include: [
                    { model: User, as: 'Patient', attributes: ['idUser', 'fullName', 'email','photo_uri'] },
                    { model: Caretaker, as: 'Caretaker', attributes: ['idCare taker', 'fullName' ,'photo_uri'] }
                ]
            });
        } else {
            return res.status(400).json({ error: 'Invalid role' });
        }

        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/appointments/accepted-count', async (req, res) => {
  try {
      const acceptedCount = await Appointment.count({
          where: { status: 'accepted' }
      });

      res.json({ acceptedCount: acceptedCount });
  } catch (error) {
      console.error('Error fetching count of accepted appointments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
  app.post('/api/appointments/update-status', async (req, res) => {
    const { idAppointment, status } = req.body;

    if (!idAppointment || !status) {
        return res.status(400).json({ error: 'Missing required fields: idAppointment and status' });
    }

    try {
        const appointment = await Appointment.findByPk(idAppointment);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        appointment.status = status;
        await appointment.save();
        res.json({ message: 'Appointment status updated successfully', appointment });
    } catch (error) {
        console.error('Error updating appointment status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
  app.post('/api/appointments', async (req, res) => {
    try {
      const {
        idAppointment,
        Price,
        Date,
        status,
        IdCareTaker,
        User_idUser,
        duration
      } = req.body;
        if (!Date || !IdCareTaker || !User_idUser) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const newAppointment = await Appointment.create({
        idAppointment,
        Price,
        Date,
        status,
        IdCareTaker,
        User_idUser,
        duration
      });
      res.status(201).json(newAppointment);
    } catch (error) {
      console.error('Failed to create appointment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
app.post('/api/new-nurse', async (req, res) => {
  try {
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

    if (!username || !role) {
      return res.status(400).json({ error: 'Username and role are required' });
    }

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
app.delete('/api/reviews/:idReview', async (req, res) => {
  try {
      const idReview = req.params.idReview;
      const review = await Review.findByPk(idReview);
      if (!review) {
          return res.status(404).json({ message: 'Review not found' });
      }

      await review.destroy();
      res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/caretakers/fullName/:fullName', async (req, res) => {
  try {
      const caretaker = await Caretaker.findOne({
          where: { fullName: req.params.fullName }
      });
      if (!caretaker) return res.status(404).json({ error: 'Caretaker not found' });
      res.json(caretaker);
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/reviews', async (req, res) => {
  try {
      const reviews = await Review.findAll({
          include: [
              {
                  model: Caretaker,
                  as: 'Caretaker',
                  attributes: ['idCare taker', 'fullName', 'photo_uri']
              },
              {
                  model: User,
                  as: 'User',
                  attributes: ['idUser', 'fullName', 'photo_uri']
              }
          ]
      });

      if (reviews.length === 0) {
          return res.status(404).json({ message: 'No reviews found' });
      }

      res.json(reviews);
  } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/appointments/all', async (req, res) => {
  try {
      const appointments = await Appointment.findAll({
          include: [
              { model: User, as: 'Patient', attributes: ['idUser', 'fullName', 'email', 'photo_uri'] },
              { model: Caretaker, as: 'Caretaker', attributes: ['idCare taker', 'fullName', 'photo_uri'] }
          ]
      });

      if (appointments.length === 0) {
          return res.status(404).json({ message: 'No appointments found' });
      }

      res.json(appointments);
  } catch (error) {
      console.error('Error fetching all appointments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/appointments/accepted-sum-per-month', async (req, res) => {
  try {
    const results = await Appointment.findAll({
      where: {
        status: 'accepted'
      },
      attributes: [
        [sequelize.fn('YEAR', sequelize.col('Date')), 'year'],
        [sequelize.fn('MONTH', sequelize.col('Date')), 'month'],
        [sequelize.fn('SUM', sequelize.cast(sequelize.col('Price'), 'decimal(10,2)')), 'totalSales']
      ],
      group: ['year', 'month'],
      order: [
        [sequelize.fn('YEAR', sequelize.col('Date')), 'ASC'],
        [sequelize.fn('MONTH', sequelize.col('Date')), 'ASC']
      ],
      raw: true
    });

    const dataMap = {};
    for (const result of results) {
      dataMap[`${result.year}-${result.month}`] = result;
    }

    const currentYear = new Date().getFullYear();
    const formattedResults = [];
    for (let month = 1; month <= 12; month++) {
      const key = `${currentYear}-${month}`;
      const data = dataMap[key] || { month, year: currentYear, totalSales: '0.00' }; 
      formattedResults.push({
        month: data.month,
        year: data.year,
        totalSales: (Number(data.totalSales) || 0).toFixed(2)
      });
    }

    res.json(formattedResults);
  } catch (error) {
    console.error('Failed to fetch monthly sums of accepted appointments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/new-user', async (req, res) => {
  try {
    const {     
      username,
      role,
      fullName,
      password,
      email,
      phone,
      Adress,
      birthday
    } = req.body;

    if (!username || !role) {
      return res.status(400).json({ error: 'Username and role are required' });
    }

    const newUser = await User.create({
      username,
      role,
      fullName,
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

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    let user = await User.findOne({ where: { email } });
    let userType = 'user';

    if (!user) {
      user = await Caretaker.findOne({ where: { email } });
      userType = 'caretaker';
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    console.log('Entered password:', password);
    console.log('Stored hashed password:', user.password);
    
    const isPasswordValid = (password == user.password);

    console.log('Is password valid?', isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, userType },
      'your-secret-key',
      { expiresIn: '1h' }
    );

    console.log('Generated token:', token);

    res.json({ token, user });
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
app.get('/api/caretakers/:idCareTaker', async (req, res) => {
  const { idCareTaker } = req.params;

  try {
      const caretaker = await Caretaker.findByPk(idCareTaker, {
          include: [{
              model: Review,
              as: 'reviews',
              attributes: []
          }]
      });

      if (!caretaker) {
          return res.status(404).json({ error: 'Caretaker not found' });
      }

      // Calculate the average rating
      const averageRating = await Review.findAll({
          where: { "idCare taker": idCareTaker },
          attributes: [[sequelize.fn('AVG', sequelize.col('numberOfStars')), 'avgRating']],
          raw: true,
      });

      caretaker.dataValues.rating = averageRating[0].avgRating || 0; // Add average rating to caretaker data

      res.json(caretaker);
  } catch (error) {
      console.error('Error fetching caretaker information:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


async function updateCaretakerRating(idCaretaker) {
  const aggregate = await Review.findAll({
      where: { "idCare taker": idCaretaker },
      attributes: [[sequelize.fn('AVG', sequelize.col('numberOfStars')), 'avgRating']],
      raw: true,
  });

  await Caretaker.update(
      { rating: aggregate[0].avgRating },
      { where: {  "idCare taker": idCaretaker } }
  );
}
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
  try {
      // Fetch all caretakers
      const nurses = await Caretaker.findAll();

      // Update rating for each nurse
      const updateRatingsPromises = nurses.map(nurse =>
          updateCaretakerRating(nurse["idCare taker"]).then(() =>
              Caretaker.findByPk(nurse["idCare taker"])
          )
      );

      // Wait for all ratings to be updated
      const updatedNurses = await Promise.all(updateRatingsPromises);

      // Respond with updated data
      res.json(updatedNurses);
  } catch (error) {
      console.error('Error fetching and updating nurses:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/nurses/:idCareTaker', async (req, res) => {
  try {
    const { idCareTaker } = req.params;
    const nurse = await Caretaker.findByPk(idCareTaker);
    if (!nurse) {
      return res.status(404).json({ error: 'Nurse not found' });
    }
    res.json(nurse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching nurse information' });
  }
});
app.get('/api/users/name/:fullName', async (req, res) => {
  try {
    const { fullName } = req.params;
    // Decode the fullName to handle spaces and other URL-encoded characters
    const decodedName = decodeURIComponent(fullName);

    // Find the user by their full name
    const user = await User.findOne({
      where: { fullName: decodedName }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user information' });
  }
});

app.get('/api/users/:idUser', async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await User.findByPk(idUser);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user information' });
  }
});
app.post('/api/reviews', async (req, res) => {
  try {
    // Extracting data from the request body
    const { numberOfStars, description, idCaretaker, idUser } = req.body;

    // Validate the input
    if (!numberOfStars || !idCaretaker || !idUser) {
      return res.status(400).json({ error: 'Missing required fields: numberOfStars, idCaretaker, and idUser.' });
    }

    // Create a new review using the Review model
    const newReview = await Review.create({
      numberOfStars,
      description,
      "idCare taker": idCaretaker, // Make sure to match the exact field name from the model
      idUser,
      reviewDate: new Date() // This will default to NOW() as specified in the model but can be explicitly set here
    });
    await updateCaretakerRating(idCaretaker);
    // Fetch the newly created review with associated Caretaker and User details
    const detailedReview = await Review.findOne({
      where: { idReview: newReview.idReview },
      include: [
        {
          model: Caretaker,
          as: 'Caretaker',
          attributes: ['username', 'full Name', 'email', 'photo_uri'] 
        },
        {
          model: User,
          as: 'User',
          attributes: ['username', 'fullName', 'email'] 
        }
      ]
    });

    if (!detailedReview) {
      return res.status(404).json({ error: 'Review created but not found' });
    }

    // Send a response back with the created review including the detailed info
    res.status(201).json(detailedReview);
  } catch (error) {
    console.error('Failed to create review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/reviews/caretaker/:idCareTaker', async (req, res) => {
  try {
    const { idCareTaker } = req.params;
    // Fetch all reviews where the idCareTaker matches the caretaker's ID in the request parameters
    const reviews = await Review.findAll({
      where: {
        "idCare taker": idCareTaker
      },
      include: [
        {
          model: Caretaker,
          as: 'Caretaker',
          attributes: ['username', 'full Name', 'email', 'photo_uri'], // Include relevant caretaker details
        },
        {
          model: User,
          as: 'User',
          attributes: ['username', 'fullName', 'email'] // Include relevant user details who wrote the review
        }
      ]
    });

    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this caretaker' });
    }
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
