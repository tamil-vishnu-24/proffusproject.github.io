const express = require("express") ;
const bodyParser = require("body-parser") ;
const ejs = require("ejs") ;
const https = require("https");
const mongoose = require("mongoose") ;
var fs = require('fs');
var path = require('path');
require('dotenv/config');

const url = 'mongodb://localhost:27017/elementsDB' ;
mongoose.connect(url) ;
console.log("server is connected with database");
var multer = require('multer');
  



const app = express() ;
app.set('view engine' , 'ejs') ;
app.use(bodyParser.urlencoded({extended : true })) ;
app.use(express.static('public')) ;


const elementSchema = new mongoose.Schema({
    name : String
} );
var imageSchema = new mongoose.Schema({
    img:
    {
        data: Buffer,
        contentType: String
    }
});
const Elements = mongoose.model("element" , elementSchema);
const Images = mongoose.model("image" , imageSchema) ;
const Image1 = new Images({
    img : "images/proffus.jpeg"
})
const Navelement1 = new Elements({
    name : "Category"
})
// Navelement1.save(function(err , result)
// {
//     if (err){
//         console.log(err); 
//     }
//     else{
//         console.log("Successfully added to database") ;
//     }
// }) ;
const Navelement2 = new Elements({
    name : "FAQs"
})
// Navelement2.save(function(err , result)
// {
//     if (err){
//         console.log(err); 
//     }
//     else{
//         console.log("Successfully added to database") ;
//     }
// }) ;
const Navelement3 = new Elements({
    name : "My Cart"
})
// Navelement3.save(function(err , result)
// {
//     if (err){
//         console.log(err); 
//     }
//     else{
//         console.log("Successfully added to database") ;
//     }
// }) ;

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });

app.get("/" , function(req , res)
{
    Elements.find(function(err , foundElements)
    {
        console.log(Elements)
        res.render("Home" , {
            NavComp1 : foundElements[0].name ,
            NavComp2 : foundElements[1].name ,
            NavComp3 : foundElements[2].name ,
        })

    })
    
    
})
app.post("/" , function(req , res)
{
    let Nav1 = req.body.nav1 ;
    let Nav2 = req.body.nav2 ;
    let Nav3 = req.body.nav3 ;
    Elements.findByIdAndUpdate({id : 1 },{name : Nav1} , function(err , results)
    {
        if (!err)
        {
            console.log("updated")
        }
        
    })
    
    if (Nav2 != undefined)
    { Elements.findByIdAndUpdate({id : 2} , {name : Nav2} , function(err , results)
    {
        if (!err)
        {
            console.log("updated")
        }
    })}
   
    
    if (Nav3!= undefined)
    {
        Elements.findByIdAndUpdate({id: 3} , {name : Nav3} , function(err , results)
        {
            if (!err)
        {
            console.log("updated")
        }
        })
    }
    
    Elements.find(function(err , foundElements)
    {
        res.render("Home" ,{
            NavComp1 : Nav1,
            NavComp2 : Nav2,
            NavComp3 : Nav3
        })

    })
    
})
// const Element = require('./modals/elements')
// const Admin = require('./modals/Admin')
// AdminBro.registerAdapter(mongooseAdminBro)
// const AdminBroOptions = {
//   resources: [Admin, Element],
// }


// const adminBro = new AdminBro(AdminBroOptions)
// const router = expressAdminBro.buildRouter(adminBro)

// app.use(adminBro.options.rootPath, router)
app.get("/admin" , function(req , res)
{
    res.render("admin")
})

app.listen(3010 , function()
{
    console.log("server is connected to the port 3010")
})