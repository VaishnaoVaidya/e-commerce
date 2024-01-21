const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');
app.listen(port, () => {
  console.log('Server listening on port http://localhost:8000');
});

mongoose
  .connect('mongodb://127.0.0.1:27017/e-commerce', {
    // .connect("mongodb+srv://ecommerceApp:3Ivu4Wdq2Sw3EYmq@cluster0.abetipk.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to Mongodb');
  })
  .catch(err => {
    console.log('Error connecting to Mongodb', err);
  });

const User = require('./models/user');
const Order = require('./models/order');

//function to send verification email to user
const sendVerificationEmail = async (email, verificationToken) => {
  //create a nodemailer transport

  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: 'gmail',
    auth: {
      user: 'vaishnaovaidya2001@gmail.com',
      pass: 'kfkwhegsojbhkihm',
    },
  });

  const mailOptions = {
    from: 'amazon.com',
    to: email,
    subject: 'Email Verification',
    text: `Please click the following link to verify your email : http://localhost:8000/verify/${verificationToken}`,
  };

  //send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.log('Error sending verification email', error);
  }
};

//Endpoint to register in the app

app.post('/register', async (req, res) => {
  try {
    const {name, email, password} = req.body;

    //check if the email is already registered
    const existingUser = await User.findOne({email});
    if (existingUser) {
      console.log('Email already registered:', email); // Debugging statement
      return res.status(400).json({message: 'Email already registered'});
    }
    //create a new user

    const newUser = new User({name, email, password});

    //generate and store the verification Token
    newUser.verificationToken = crypto.randomBytes(20).toString('hex');

    //save the user to the database
    await newUser.save();

    // Debugging statement to verify data
    console.log('New User Registered:', newUser);

    // Send verification email to the user
    // Use your preferred email service or library to send the email
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      message:
        'Registration successful. Please check your email for verification.',
    });
  } catch (error) {
    console.log('Error during registration:', error);
    res.status(500).json({message: 'Registration failed'});
  }
});

//Endpoint to verify the email;
app.get('/verify/:token', async (req, res) => {
  try {
    const token = req.params.token;

    //find the user with given verification method
    const user = await User.findOne({verificationToken: token});
    if (!user) {
      return res.status(404).json({message: 'Invalid verification token'});
    }

    //Marked the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({message: 'Email verified successfully'});
  } catch (error) {
    res.status(500).json({message: 'Email Verification Failed', error});
  }
});

// login token

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('hex');

  return secretKey;
};

const secretKey = generateSecretKey();

// end point to login the user
app.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;

    // check if the user exist
    const user = await User.findOne({email});
    console.log(user);
    if (!user) {
      return res.status(401).json({message: 'Invalid Email or Password'});
    }

    // check if the password is write or not
    if (user.password !== password) {
      return res.status(401).json({message: 'Invalid Password'});
    }

    // Generate a token
    const token = jwt.sign({userId: user._id}, secretKey);

    res.status(200).json({token});
  } catch (error) {
    res.status(500).json({message: 'Login Failed', error});
  }
});

//  End point to store a new address to a backend
app.post("/addresses", async (req, res) => {
  try {
    const {userId , address} = req.body;
    mongoose.isValidObjectId(new mongoose.Types.ObjectId())
    console.log("UserId: " + userId + " Address: " + address);

    //find the user by user Id
    const user = await User.findById({userId});
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    //add the new address to the user"s addresses list
    user.addresses.push(address);

    //save the updated user in the backend
    await user.save();

    res.status(200).json({message: "Address created Successfully"});
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({message: "Error adding address", error});
  }
});



//End point to get all the addresses of a particular user
app.get('/addresses/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    console.log('UserId: ', userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'User Not Found'});
    }

    const addresses = user.addresses;
    res.status(200).json({addresses});
  } catch (error) {
    res.status(500).json({message: 'Error retrieving the addresses', error});
  }
});
