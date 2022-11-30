const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const bodyparser =require("body-parser")
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/ContactDance');
  
}

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
const Contact = mongoose.model('Contact', contactSchema);
   


// EXPRESS SPECIFIC STUFF/CONFIGURATION
app.use('/static', express.static('static'));//for serving static files  
app.use(express.urlencoded())//form data express tak lane ke liye

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');//set the template engine as pug
app.set('views',path.join(__dirname, 'views'))//set the view directory(can use template instead of view)

// ENDPOINTS 
app.get('/', (req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);

})
app.get('/contact', (req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);

})
app.post('/contact', (req,res)=>{
    var mydata = new Contact(req.body);
    mydata.save().then(()=>{
        res.send("this Data is stored in database")

    }).catch(()=>{
        res.send("data is not saved to database")

    });
    // res.status(200).render('contact.pug');
    
    
});

// START THE SERVER
app.listen(port,()=>{
    console.log(`the application started sucessfully on ${port}`);
});



//database connection
// let mysql = require('mysql');
// let connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'app'
// });



// connection.connect(function(err) {
    //     if (err) {
        //         return console.error('error: ' + err.message);
        //     }
        
        //     console.log('Connected to the MySQL server.');
        
        //   });
        //   connection.query(`select * from app.form`,(err, res)=> {
//       return console.log(res)
//     });
    
    // connection.end(function(err) {
        //     if (err) {
            //       return console.log('error:' + err.message);
            //     }
            //     console.log('Close the database connection.');
            //   });
//by pool          
            // const pool = mysql.createPool({
            //     connectionLimit: 5,
            //     host: 'localhost',
            //     user: 'root',
            //     password: 'root', 
            //     database: 'app'
            // });
            
            // pool.query(`select * from app.form`,(err, res)=> {
                //     return console.log(res)
                //   });
    //post             
                // app.post('/contact', (req,res)=>{
                //     var name =req.body.name;
                //     var number =req.body.number;
                //     var email =req.body.email;
                //     var address =req.body.address;
                //     var desc =req.body.desc;
                //     connection.connect(function(error) {
                //         if (error) throw error;
                    
                //         var sql = "INSERT INTO app.form(name,number,email,address,desc)VALUES(?,?,?,?,?)";
                //         connection.query(sql, [name,number,email,address,desc],function(error,result){
                //             if(error) throw error;
                //             res.send('sucessully'+result.insertId)
                //         })
                    
                //       }); 
                // });