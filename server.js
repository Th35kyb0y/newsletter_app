const express = require('express');
const ejs = require('ejs')

const routes = require('./Routes/userRoutes')
const cors = require('cors');
const app = express();
const version = 'aa';


(()=>{
    // configur_db(); //for connecting database when it comes in use
    configur_cors();
    configur_parser();
    configur_routes();
    // Error Handeling
    error404();
    globalErrorHandler();
})()

function configur_parser(){
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
}


// function configur_db(){
//     db_connect();
// }

function configur_cors(){
    app.use(cors())
}

function configur_routes(){
    app.use(`/api/${version}/template`, routes)
}





function error404(){
   app.use((req, res)=>{
       res.status(404).send({
           status : 404,
           msg: 'NOT FOUND'
       })
   })
}

function globalErrorHandler(){

    app.use((err, req, res, next)=>{
        res.status(500).send({
            msg : err.message || 'Somthing went wrong. Please try again later',
            status : 500
        })
    })

}


module.exports = app