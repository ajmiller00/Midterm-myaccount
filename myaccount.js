// imports
const express = require("express")
const app = express()
// const port = 3000
var port = process.env.PORT || 3000;
const http = require('http')
var fs = require('fs');
var qs = require('querystring');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://amille26:cs20final@cluster0.ktqrs.mongodb.net/reveauchocolat?retryWrites=true&w=majority";


var name= "", email = "", phone = "", address = "";


app.get('/', (req, res) => {

  res.write("<!DOCTYPE html><html>");
      res.write("</script><meta charset='UTF-8'><meta name='viewpor' content='width=device-width, initial-scale=1.0'><link rel='preconnect' href='https://fonts.googleapis.com'>");
      res.write("<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin><link href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&display=swap' rel='stylesheet'>");
      res.write("<link rel='preconnect' href='https://fonts.googleapis.com'><link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>");
      res.write("<link href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&display=swap' rel='stylesheet'><link href='https://fonts.googleapis.com/css2?family=Amaranth&display=swap' rel='stylesheet'>");

  res.write("<title>My Account</title><link rel = 'stylesheet' type = 'text/css' href = 'https://ajmiller00.github.io/Midterm/style.css'>");

   //infile styling
   res.write("<style type='text/css'>")
       res.write("p{font-family: 'Amaranth', sans-serif;font-style: italic;weight: 600;font-size: 15px;text-align: center;color: #003267;margin-left: 5%;margin-right: 5%;}")
       res.write("body {font-family: 'Amaranth', sans-serif; background-color:#003267;margin-left: 0px;margin-right: 0px;}")
       res.write(".info {padding: 0 30% 30% 30%; margin:0; background-color: #fcecc8;}")
       res.write("h2 { text-align: left; font-size: 25pt; font-weight: 900; } h4 { font-size:  25px; color: #003267; } p {text-align: left; font-size: 15px; font-weight:300; }");
   res.write("</style>")

   //header
   res.write("<header><div class='a' style='text-align:center; position: relative;'><div class='loginburger' style='position:absolute;'>");
        res.write("<img src='https://ajmiller00.github.io/Midterm/acc_icon.png' width='30px'><a class = 'burger' href='https://reveauchocolat-myaccount.herokuapp.com/'>Profile</a>");
        res.write("<a class = 'burger' href='https://reveauchocolat-login.herokuapp.com/'>Log In</a></div>");
        res.write("<div class='logo' style='display: inline-block;'><a href='https://ajmiller00.github.io/Midterm/index.html'><img src='https://ajmiller00.github.io/Midterm/logo-06.png' class='header'/></a></div></div>");
        res.write("<nav><ul><li><a href='https://ajmiller00.github.io/Midterm/about_us.html'>About Us</a> </li><li><a href='https://reveauchocolat-products.herokuapp.com/'>Shop</a> </li>");
        res.write("<li><a href='https://ajmiller00.github.io/Midterm/catering.html'>Catering</a> </li>");
        res.write("<li><a href='https://reveauchocolat-gifts.herokuapp.com/'>Gifts</a> </li>");
        res.write("<li><a href='https://ajmiller00.github.io/Midterm/workshops_events.html'>Events</a> </li><li><a href='https://ajmiller00.github.io/Midterm/contact.html' >Contact Us</a> </li>");
        res.write("<li><a href='https://reveauchocolat-cart.herokuapp.com/' style='padding:10px 20px; background-color: #ff9933; color: #003267;border: none;margin-top:  10px;cursor:pointer;-webkit-border-radius: 5px;border-radius: 4px;'>My Cart</a> </li>");
        res.write("</ul></nav>");

    res.write("<div class='burger' id = 'bur'><img src='https://ajmiller00.github.io/Midterm/burger.png' class='burger' onclick='show()'></div>");
        res.write("<div class='oBurger' id = 'burger'><ul id = 'burgerUl'>");
        res.write("<li><a class = 'burger' href='https://ajmiller00.github.io/Midterm/about_us.html'>About Us</a> </li><li><a href='https://reveauchocolat-products.herokuapp.com/'>Shop</a> </li>");
        res.write("<li><a class = 'burger' href='https://ajmiller00.github.io/Midterm/catering.html'>Catering</a> </li>");
        res.write("<li><a class = 'burger' href='https://reveauchocolat-gifts.herokuapp.com/'>Gifts</a> </li>");
    res.write("<li><a class = 'burger' href='https://ajmiller00.github.io/Midterm/workshops_events.html'>Events</a> </li><li><a href='https://ajmiller00.github.io/Midterm/contact.html' >Contact Us</a> </li>");
        res.write("<li></li><li></li><li><a class = 'burger' href='https://reveauchocolat-cart.herokuapp.com/'>My Cart</a></li></ul></div></header>");
        res.write("<script language='javascript'>");
        res.write("function show() { if (document.getElementById('burger').style.display =='none') { document.getElementById('burger').style.display = 'block'; } else {");
        res.write("document.getElementById('burger').style.display = 'none'; } } </script> ");


    MongoClient.connect(url, { useUnifiedTopology: true }, async function(err, db) {
        if(err) {
          return console.log(err); return;
        }

          var dbo = db.db("reveauchocolat");
          var collection = dbo.collection('users');
          var currentUser = dbo.collection('current');
          // theQuery = "";


          currentUser.findOne({current: "current"}, async function (err, currentUser) {
            if(err) {
              return console.log(err); return;
            }
            if(currentUser.email == "FAILURE"){
              res.write("User is not logged in.");
              res.end(); return;
            }

			         var query = {email : currentUser.email }
               // var query = {email : "hihi" }

               console.log("Success!");

               console.log("before find");

               await collection.find(query).toArray(async function(err, items) {
                 if (err) {
                   console.log("Error: " + err);
         			    res.end();
         		  	  db.close();
         		    }
         		    else
         		    {
                  console.log("looking for user info")
                  for (i=0; i<items.length; i++){
                    name = items[i].fname + " " + items[i].lname;
                    console.log(name);
                    email = items[i].email;
                    console.log(email);
                    phone = items[i].phone.$numberLong;
                    console.log(phone);
                    address = items[i].street + ", " + items[i].city + ", " + items[i].state + " " + items[i].zip;
                    console.log(address);
                  }


                   //html body
         			    res.write("<body>");
                     // res.write(" ");

                     res.write("<div class='info'>");
                       res.write("<h1 style='background-color: #fcecc8;'>My Account</h1>");
                         res.write("<h2>Contact Information</h2>");
                         res.write("<p>Name: " + name + "</p>");
                         res.write("<p>Email: " + email + "</p>");
                         res.write("<p>Phone: " + phone + "</p>");

                         res.write("<h2>Shipping Information</h2>");
                         res.write("<p>Address: " + address + "</p>");

                     res.write("</div>");

             			res.write("<footer style='background-color: #003267'>&copy; 2021 Rêve au Chocolat – 23 Fausse Street, Cambridge, MA – (617) 555 0113</footer> </body> </html>");

         		    }//end else
         		    res.end();
         		  	db.close();
         		});//find query

          });//current user


	});//mongo connect

});//app get





app.listen(port);
