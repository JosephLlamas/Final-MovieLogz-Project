const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const {MONGO_URI} = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser =async(req,res) =>{
  const {user} = req.body;
  const userEmail = user.email;
  
  try{
      const client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const db = client.db("db-name");
      const result = await db.collection("users").findOne({email: userEmail });
    if (result === {email:userEmail}) {
     return res.status(200).json({status:200, message:"This user exists"})

    }else {
    const NewUser= Object.assign(
    {backlog:[]},
    {_id: uuidv4()}
    );
    await db.collection("users").insertOne(NewUser);
    client.close();
    return res.status(200).json({status:200, message:"New User Added!"})
    }
  } catch (err) {
    return res.status(500).json({status:500, message:err.message});
  }


};

module.exports = { addUser };