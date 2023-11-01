const mongoose = require('mongoose');
const connectDatabase =()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`Mongo Database is coneected to the Host :${con.connection.port}`)
    })/*.catch( (err)=>{
        console.log(err)
    }) */ // Remove to catch the exception

}

module.exports = connectDatabase;