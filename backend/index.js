
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// MongoDB connection
console.log(process.env.MONGODB_URL);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error("Database connection error:", err));

// Schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  isAdmin: {
    type: Boolean,
    default: false,
  }
});

// Model
const userModel = mongoose.model("user", userSchema);

// API routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Signup route
app.post("/signup", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);

    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "Email ID is already registered" });
    }

    const newUser = new userModel(req.body);
    if (email === "s19420@sci.pdn.ac.lk") {
      newUser.isAdmin = true;  // Set admin flag for the specified email
    }
    await newUser.save();
    
    res.status(201).json({ message: "Successfully signed up" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Received login request:', email, password); // Debugging log

    // Check for admin credentials
    if (email === "s19420@sci.pdn.ac.lk" && password === "123") {
      return res.status(200).json({ user: { email, isAdmin: true } });
    }

    
    const user = await userModel.findOne({ email });

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: "User not found" });
    }

    if (password !== user.password) {
      console.log('Invalid credentials');
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log('Login successful');
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//product section
const schemaProduct = mongoose.Schema({
  name : String,
  category : String,
  image : String,
  price : String,
  description : String,
});

const productModel = mongoose.model("product",schemaProduct);

//save product in data
//api
/*
app.post("/uploadProduct",(req,res)=>{
  console.log(req.body)
  res.send({message : "Upload successfully"})
})*/
// Product upload route
app.post("/uploadProduct", async (req, res) => {
  try {
    const productData = new productModel(req.body);
    await productData.save(); // Save the product data to the database

    res.status(201).json({ message: "Product uploaded successfully" });
  } catch (error) {
    console.error("Error uploading product:", error);
    res.status(500).json({ message: "Failed to upload product" });
  }
});

//

app.get("/product", async (req,res)=>{
  //const data = await productModel.find({})
  //res.send(JSON.stringify(data))
  try {
    const data = await productModel.find({});
    res.status(200).json(data);  // Ensure a proper response
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }

});




//server is running
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));


/*const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// MongoDB connection
console.log(process.env.MONGODB_URL);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error("Database connection error:", err));

// Schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String
});

// Model
const userModel = mongoose.model("user", userSchema);

// API routes
app.get("/", (req, res) => {
  res.send("Server is running");
});
//sign up
app.post("/signup", async (req, res) => {
    try {
      const { email } = req.body;
      console.log(req.body);
  
      const existingUser = await userModel.findOne({ email: email });
  
      if (existingUser) {
        return res.status(400).json({ message: "Email ID is already registered",alert:false });
      }
  
      const newUser = new userModel(req.body);
      await newUser.save();
      
      res.status(201).json({ message: "Successfully signed up",alert:true });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

//api login
app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('Received login request:', email, password); // Debugging log
  
      const user = await userModel.findOne({ email });
  
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: "User not found" });
      }
  
      if (password !== user.password) {
        console.log('Invalid credentials');
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      console.log('Login successful');
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
*/

/*const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app=express();
app.use(cors());
app.use(express.json({limit:"10mb"}));


const PORT = process.env.PORT || 8080;
//mongodb connection
console.log(process.env.MONGODB_URL);
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Connect to Database"))
.catch((err)=>console.error("Database connection error:", err));

//schema
const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:{
        type:String,
        unique:true,
    },
    password:String,
    confirmPassword:String
});
//
const userModel = mongoose.model("user",userSchema);
//api
app.get("/",(req,res)=>{
    res.send("Server is running")
});

app.post("/signup", async(req,res)=>{
    console.log(req.body)
    const {email}=req.body

    userModel.findOne({email :email},(err,result)=>{
        console.log(result)
        console.log(err)
        if(result){
            res.send({message:"Email id is already register"})
        }else{
            const data=userModel(req.body);
            const save = data.save();
            res.send({message:"Successfully sign up"});     
        }
    })
})

app.listen(PORT,()=>console.log("server is running at port :"+ PORT))*/