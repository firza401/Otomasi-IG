var express  = require('express')
var path     = require('path')
var bodyParser = require('body-parser')
var app = express()
var expressValidator = require('express-validator')
var createError = require("http-errors")
var mysql = require("mysql")
var session = require("express-session")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var db = require("./database")
var swal = require('sweetalert2');
var save = require('instagram-save');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(cookieParser());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cobaig'
});
connection.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

// var connect  = require('express-myconnection')

// app.use(
//     connect(mysql,{
//         host     : 'localhost',
//         user     : 'root',
//         password : '',
//         database : 'test',
//         debug    : false //set true if you wanna see debug logger
//     },'request')

// );

// var userData;
// var sql = "SELECT * FROM cobaig";
//   db.query(sql, function (err, data, fields) {
//     if (err) throw err;
//     userData = data;
// })

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);



app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname + "/login.html"));
});

app.post("/auth", function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    connection.query(
      "SELECT * FROM admin WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        if (results.length > 0) {
          console.log(results)
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect("/home");
        } else {
          response.send('Incorrect Username and/or Password! <a href="/logout">Back</a>');
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.get("/logout", function (req, res) {
  req.session.destroy(function () {
    res.redirect("/");
  });
});

app.get("/home", function (request, response) {
  if (request.session.loggedin) {
    response.render("pages/home");
  } else {
    response.send('Please login to view this page! <a href="/logout">Back</a>');
  }
  response.end();
});
app.get("/users-list", function(request, response){
  let sql = "SELECT * FROM cobaig";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    response.render('pages/users-list',{
      userData: results
    });
  });
})
// app.post("/users-list/:user_id", function(request, response){
//   if (request.session.loggedin) {
//     var id= request.params.user_id;
//     var sql = 'DELETE FROM cobaig WHERE user_id = ?';
//     db.query(sql, [id], function (err, data) {
//     if (err) throw err;
//     console.log(data.affectedRows + " record(s) updated");
//     });
//   response.redirect('/home');
//   } else {
//     response.send('Please login to view this page! <a href="/logout">Back</a>');
//   }
//   response.end();
// })

//route for update data
app.post('/users-list/update',(req, res) => {
  let sql = "UPDATE cobaig SET status='Active' WHERE user_id="+req.body.id;
  let sql2 = "UPDATE cobaig SET status='Non-Active' WHERE user_id!="+req.body.id;
  console.log(sql)
  console.log(sql2)
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
  });
  let query2 = connection.query(sql2, (err, results) =>{
    if (err) throw err;
  })
    res.redirect('/users-list')
});

//route for delete data
app.post('/users-list/delete',(req, res) => {
  let sql = "DELETE FROM cobaig WHERE user_id="+req.body.user_id+"";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/users-list');
  });
});

app.get('/buat-postingan',(request,response) =>{
  if (request.session.loggedin) {
    response.render("pages/postingan");
  } else {
    response.send('Please login to view this page! <a href="/logout">Back</a>');
  }
  response.end();
})

app.get('/download-postingan',(request,response) =>{
  if (request.session.loggedin) {
    response.render("pages/download");
    var URL = request.query.URL;
    var myDir='C:/Users/perlengkapan/Documents/ELECTRON/app10-ui/hasil-download';
    var splitted_URL=URL.slice("/");
    var array_length=splitted_URL.length;
    insta_photo_id=splitted_URL[array_length-2]
    save(insta_photo_id, myDir).then(res => {
        console.log(res.file);
      });
    console.log(insta_photo_id)
  } else {
    response.send('Please login to view this page! <a href="/logout">Back</a>');
  }
  response.end();
})
app.get('/logout',  function (req, res, next)  {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});
app.listen(3000, () => {
  console.log(`Jalan borr di 3000`);
});
module.exports = app;
