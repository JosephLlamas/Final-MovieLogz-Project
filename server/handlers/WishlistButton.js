const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addToWatchList = async(req,res) =>{
  const client = new MongoClient(MONGO_URI, options);
  const watchlist = {
    userId: req.body.userId,
    watchlistArr: req.body.watchlistArr, 
    actualItem: req.body.actualItem
  }
  try{
    await client.connect();
    const db =client.db("db-name");
    await db.collection("users").updateOne({_id: watchlist.userId}, {$set:{watchlist:watchlist.watchlistArr}})
    return res.status(200).json({status:200});

  }catch (err) {
    client.close();
    return res.status(404).json({status:404, error:err.message});
  }
    
}



module.exports = {addToWatchList};