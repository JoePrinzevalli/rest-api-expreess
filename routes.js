const express = require('express');
const { asyncHandler } = require('./middleware/async-handler');
const { User, Course } = require('./models');
const { authenticateUser } = require('./middleware/auth-user');

// Construct a router instance.
const router = express.Router();

// Returns all properties and values for the currently authenticated User
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {

    const user = req.currentUser; //undefined atm, has to do with app.js line 28??
    console.log(user);
    //'user.firstName' not working, but i think 'User.firstName' is//
  
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
    });
  }));

// Route that creates a new user.
router.post('/users', asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.status(201).location('/').end();
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });   
      } else {
        throw error;
      }
    }
  })); 
  
// route that will return all courses including the User associated with each course and a 200 HTTP status code.  
router.get('/courses', asyncHandler(async (req, res) => {
    const course = await Course.findAll({
        attributes: [ 'title', 'description', 'estimatedTime', 'materialsNeeded', 'userId' ],
        include: [
            {
                model: User,
                attributes: [ 'firstName', 'lastName', 'emailAddress' ]
            }
        ]
    });
    res.status(200).json(course);
})
);

//route that will return the corresponding course including the User associated with that course and a 200 HTTP status code.
router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Course.findOne({
        where: {id:req.params.id},
        attributes: [ 'title', 'description', 'estimatedTime', 'materialsNeeded', 'userId' ],
        include: [
            {
                model: User,
                attributes: [ 'firstName', 'lastName', 'emailAddress' ]
            }
        ]
    });
    res.status(200).json(course);
})
);

// route that will create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code and no content.
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
    try {
      await Course.create(req.body);
      res.status(201).location('/').end();
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });   
      } else {
        throw error;
      }
    }
  }));

// route that will update the corresponding course and return a 204 HTTP status code and no content.
  router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    try {
        let course = await Course.findOne({ where: { id: req.params.id } });
        const user = req.currentUser;
        if (course) {
            if (user.id === course.userId) {
                await course.update(req.body);
                res.status(204).end();
            } else {
                res.status(403).json({error});
            }
        } else {
            res.status(404).json({error: {message: `Course not found`}});
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({errors});
        } else {
            throw error;
        }
    }
  }))

module.exports = router;