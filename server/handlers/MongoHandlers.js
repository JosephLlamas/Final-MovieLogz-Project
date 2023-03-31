const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// creating a new user
const createUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userInfo = req.body;
  const failure = {
    status: 400,
    error: [],
  };
  let failed = false;

  try {
    await client.connect();
    const db = client.db("db-name");
    const users = await db
      .collection("users")
      .findOne({ email: userInfo.email });
    //validate if the user is already registered
    if (users !== null) {
      failed = true;
      failure.error.push("this email already exist!");
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      failed = true;
      failure.error.push("password does not match!");
    }
    if (userInfo.password.length < 8) {
      failed = true;
      failed.error.push("Password must be atleast 8 characters long");
    }
    if (failed) {
      throw new Error(failure.error);
    } else {
      const ID= uuidv4();
      const user = {
        _id: ID,
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        password: userInfo.password,
        userType: 1,
        watchlist: [],
      };
      await db.collection("users").insertOne(user);
      client.close();
      return res
        .status(200)
        .json({ status: 200, message: "New User Added!", data: user });
    }
  } catch (err) {
    client.close();
    return res.status(404).json({ status: 404, error: err.message });
  }
};

//Sign in when user is found

const signin = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userEmail = req.params.email;
  const userPassword = req.params.password;
  console.log(req.params)
  try {
    await client.connect();
    const db = client.db("db-name");
    const user = await db.collection("users").findOne({email: userEmail});
    if (user === null) {
      throw new Error("No account Found");
    }
    if (user.password !== userPassword) {
      throw new Error("Wrong Password");
    }
    client.close();
    return res
      .status(200)
      .json({status: 200, message: "Welcome Back", data: user});
  } catch (error) {
    client.close();
    return res.status(404).json({status: 404, error: error.message});
  }
}; 


//Delete movie ID from watchlist
const deleteMovie =async (req,res) =>{
  const client = new MongoClient(MONGO_URI, options)
  const userId = req.body.userId
  const watchlistId = Number(req.params.id)
  console.log(typeof watchlistId)
  try {
      await client.connect()
      const db = client.db("db-name")
      const reservation = await db.collection("users").findOne({ _id: userId, "watchlist": {"$elemMatch": {id: watchlistId} }});
      // const reservation = await db.collection("users").findOne({_id: "2c84613e-23b1-4a16-bd04-e2954c0fb556", "watchlist.id": watchlistId});
      // console.log(reservation, "i am here")
    if (!reservation) {
      return res
        .status(404)
        .json({ status: 404, message: "Watchlist Item not found" });
    }
      //deletes from watchlist here 
      const deleted = await db.collection('users').updateOne({ _id: userId, "watchlist": {"$elemMatch": {id: watchlistId} }}, {$pull: {"watchlist": {id: watchlistId}}})
      if(deleted.modifiedCount > 0 ){
          const updatePage = await db.collection("users").findOne({_id: userId})
          return res.status(200).json({status: 200, message : "item successfully deleted", data: updatePage})
      }
  } catch (error) {
      return res.status(404).json({status:404,error : error.message})
  }finally{
      client.close()
  }
};

 //get all movies from watchlist 
 const  viewMovies = async (req,res) =>{
  const userId =req.params.userId 
  const client = new MongoClient(MONGO_URI,options);

  try{
    await client.connect();
    const db = client.db("db-name");
    const result= await db.collection("users").findOne({_id: userId});
    res.status(200).json({status:200, data:result});
  }catch (err){
    console.log(err.stack);
    res.status(404).json({status:400, message:"data not found!"});

  } finally {
    client.close();
  }


 };



module.exports = { createUser, signin,  deleteMovie,viewMovies};
