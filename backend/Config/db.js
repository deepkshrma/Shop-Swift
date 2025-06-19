const mongoose = require('mongoose');  // its library that manage database connection and operation 

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
    .then(() =>{
        console.log('mongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connected Error: ', err);
    })