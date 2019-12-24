var express=require('express');
var app=express();

app.listen(3001,function(){
    console.log("Express Started on Port 3001");
});

var nodemailer = require("nodemailer");

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    secure:false,
    host: "smtp.gmail.com",
    auth: {
        user: 'chetanbhargav0099@gmail.com',
        pass: 'Bhaijaan@123'
    }
});

/*------------------SMTP Over-----------------------------*/


/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
    res.sendfile('index.html');
});


app.get('/send',function(req,res){
    var mailOptions={
       
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});

/*--------------------Routing Over----------------------------*/
