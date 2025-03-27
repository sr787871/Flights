const {serverConfig,logger} = require("./config");
const express = require("express");
const bodyparser = require('body-parser');
const apiRoutes = require("./routes");

const app = express();

// app.get('api/v1/blogs',(req,res)=>{

// });

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(bodyparser.text());

app.use('/api',apiRoutes);

app.listen(serverConfig.PORT,async ()=>{
    console.log(`Successfully started the server at PORT : ${serverConfig.PORT}`);
    
    // These are some custom functions that sequelize provides us to directly query the DB.
    // const {City,Airport} = require('./models')
    // const city = await City.findByPk(5);
    // // city.createAirport({name:'Bir Airport',code : 'BIR'});
    // await City.destroy({
    //     where : {
    //         id:5
    //     }
    // })
    // console.log(city)
})