var express = require('express');
var router = express.Router();
const memberSchema = require('../models/member');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { auth } = require('../middleware/auth');


// Login
router.post('/login', async function (req, res, next) {
  const { name, password } = req.body;

  try {
    // Verify user registration
    const user = await memberSchema.findOne({ name });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: 'Not a member, Please register.',
        data: {}
      });
    }

    // Check pass
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: 400,
        message: 'Password is incorrect.',
        data: {}
      });
    }
    if(!user.isApproved){
      return res.status(400).json({
        status: 400,
        message: 'User is not approved',
        data: {}
      });
    }

    const payload = {
      userId: user.id,
      userName: user.name,
      userRole: user.roleAdmin
    };

    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });

    res.status(200).json({
      status: 200,
      message: 'Login success',
      data: { name, token}
    });

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {}
    });
  }
});

// Register
router.post('/register', async function (req, res, next) {
  const { name, password } = req.body;

  try {
    // Check user
    const existingUser = await memberSchema.findOne({ name });
    if (existingUser) {
      return res.status(400).json({
        status: 400,
        message: 'User already exists',
        data: {}
      });
    }

    const user = await memberSchema.create({
      name,
      password: await bcrypt.hash(password, 10),
      isApproved: false,
      roleAdmin: false
    });

    res.status(201).json({
      status: 201,
      message: 'Registration successful. Please wait for admin approval.',
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {}
    });
  }
});

// Approve
router.put('/approve/:id', async function (req, res, next) {
  const { id } = req.params
  // const checkRole = req.user;
  // console.log(checkRole.roleAdmin)

  // if(!checkRole){
  //   throw new Error('User is not admin');
  // }

  try {
    const user = await memberSchema.findById(id)

    if (user.isApproved) {
      return res.status(400).json({
        status: 400,
        message: 'User is already approved',
        data: {}
      });
    }

    user.isApproved = true;
    user.save();

    res.status(200).json({
      status: 200,
      message: 'User approved',
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {}
    });
  }
});

// Delete user
router.delete('/:id', async function (req, res, next) {
  const { id } = req.params;

  try {
    await memberSchema.findByIdAndDelete(id);

    res.status(200).json({
      status: 200,
      message: 'Delete success.',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {}
    });
  }
});


module.exports = router;