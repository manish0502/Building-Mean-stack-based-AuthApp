const mongoose =require('mongoose');
const config = require('config') ;
//const db = config.get('mongoURI');
const db =require('./default')



const connectDB = async ()=>{
    try{
        await mongoose.connect(db.mongoURI,{ useUnifiedTopology: true ,useNewUrlParser: true ,useCreateIndex: true , useFindAndModify:false});
        console.log('MongoDB Connected .....' +db.mongoURI)

    }catch(err){
        console.error(err.message);
        //Exit process with Failure
        process.exit(1);

    }
}

module.exports =connectDB;