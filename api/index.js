const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
app.listen(port, () => {
  console.log("Server listening on port http://localhost:8000");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/e-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to Mongodb");
  })
  .catch((err) => {
    console.log("Error connecting to Mongodb", err);
  });



const User = require("./models/user");
const Order = require("./models/order");

//function to send verification email to user
const sendVerificationEmail = async (email, verificationToken) => {
  //create a nodemailer transport

  const transporter = nodemailer.createTransport({
        // Configure the email service or SMTP details here
    service: "gmail",
    auth: {
      user: "vaishnaovaidya2001@gmail.com",
      pass: "cimlpuoarxkqpogs",
    },
  });
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email : http://localhost:8000/verify/${verificationToken}`,
  };

  //send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.log("Error sending verification email", error);
  }
};

//Endpoint to register in the app

app.post("/register", async (req, res) => {
  try {
    const {name, email, password} = req.body;

    //check if the email is already registered
    const existingUser = await User.findOne({email});
    if (existingUser) {
        console.log("Email already registered:", email); // Debugging statement
      return res.status(400).json({message: "Email already registered"});
    }
    //create a new user

    const newUser = new User({name, email, password});

    //generate and store the verification Token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to the database
    await newUser.save();

     // Debugging statement to verify data
     console.log("New User Registered:", newUser);

     // Send verification email to the user
     // Use your preferred email service or library to send the email
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res.status(201).json({
        message:
          "Registration successful. Please check your email for verification.",
      });
  } catch (error) {
    console.log("Error during registration:", error);
    res.status(500).json({message: "Registration failed"});
  }
});

//Endpoint to verify the email;
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //find the user with given verification method
    const user = await User.findOne({verificationToken: token });
    if (!user) {
      return res.status(404).json({message: "Invalid verification token"});
    }

    //Marked the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({message: "Email verified successfully"});
  } catch (error) {
    res.status(500).json({message: "Email Verification Failed", error});
  }
});

const generateSecretKey = () =>{
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
}

const secretKey = generateSecretKey();

// end point to login the user
app.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    
    // check if the user exist
    const user = await User.findOne({email});
    if(!user){
      return res.status(401).json({message: "Invalid Email or Password"});
    }

    // check if the password is write or not
    if(user.password !== password){
      return res.status(401).json({message: "Invalid Password"});
    }

    // genetare a token
    const token = jwt.sign({userId: user._id},secretKey);

    res.status(200).json({token})
  } catch (error) {
    res.status(500).json({message: "Login Failed", error});
  }
})