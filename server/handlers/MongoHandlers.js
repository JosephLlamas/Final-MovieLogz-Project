const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const {MONGO_URI} = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// creating a new user
const createUser = async (req,res) =>{
    const client = new MongoClient(MONGO_URI, options)
    const userInfo = req.body
    const failure={
      status:400, 
      error:[],
    }
    let failed = false

    try{
      await client.connect()
      const db = client.db("db-name")
      const users = await db.collection("users").findOne({email: userInfo.email})
      //validate if the user is already registered
      if(users !== null){
        failed = true;
        failure.error.push('this email already exist!')
      }
      if(userInfo.password !== userInfo.confirmPassword){
        failed = true;
        failure.error.push('password does not match!')
      }
      if (userInfo.password.length <8){
        failed=true
          failed.error.push('Password must be atleast 8 characters long')
}
if(failed){
  throw new Error(failure.error)
} else {
    const user ={
      _id: uuidv4(),
      email: userInfo.email,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      password:userInfo.password,
      userType: 1,
      watchlist:[]
    }
    await db.collection('users').insertOne(user)
    client.close()
    return res.status(200).json({status:200, message:"New User Added!",data: user})
}
    } catch (err){
      client.close()
      return res.status(404).json({status:404, error: err.message})
    }
    
}

module.exports = {createUser}


