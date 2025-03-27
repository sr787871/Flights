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

app.listen(serverConfig.PORT, ()=>{
    console.log(`Successfully started the server at PORT : ${serverConfig.PORT}`);
})