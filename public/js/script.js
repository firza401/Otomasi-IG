var { Electrolizer } = require("@ugenu.io/electrolizer");
var { Cookies } = require("electron");
var http = require("http");
var mysql = require("mysql");
var bodyParser = require("body-parser");
const swal = require('sweetalert2');

const button = document.getElementById("login");
const webview = document.getElementById("foo");
webview.addEventListener("dom-ready", () => {
  webview.openDevTools();
});
window.$ = window.jQuery = require("jquery");

const username = document.getElementById("username");
const password = document.getElementById("password");

button.addEventListener("click", windowElectrolizer);

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "cobaig",
  password: "",
  multipleStatements: true,
});

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cobaig",
  multipleStatements: true,
});

var nickname, linkpp, postingan, followers, following;
function tambahdata() {
  const username2 = document.getElementById("username").value;
  const password2 = document.getElementById("password").value;

  pool.query(
    "INSERT INTO cobaig (username, password, nickname, linkpp, postingan, followers, following) VALUES('" +
      username2 +
      "', '" +
      password2 +
      "','" +
      nickname +
      "', '" +
      linkpp +
      "', '" +
      postingan +
      "', '" +
      followers +
      "', '" +
      following +
      "')",
    function (err, rows) {
      if (err) {
        console.log("query error " + err);
      } else {
        console.log("data berhasil ditambah");
        swal.fire(
          'Good job!',
          'Data berhasil ditambah!',
          'success'
        )
      }
    }
  );
 connection.end();
}

function windowElectrolizer() {

  let electrolizer = new Electrolizer(webview);

  const uservalue = username.value;
  const passvalue = password.value;
  electrolizer
    .wait('.sqdOP.yWX7d.y3zKF')
    .click('.sqdOP.yWX7d.y3zKF')
    .exists('.pexuQ')
    .then(function (result) {
      if (result) {
        function login() {
          electrolizer
            .wait('.pexuQ')
            .type(
              '.pexuQ',
              "" + uservalue + "\u0009" + passvalue + "\u000d"
            );
        }
        return login();
      }
    })
    .then(function () {
      return (
        electrolizer
          .wait(10000)
          .click('.sqdOP.yWX7d.y3zKF')
          .wait('#react-root section nav.NXc7H.f11OC div div div.KGiwt div div div:nth-child(5) a')
          .click('#react-root section nav.NXc7H.f11OC div div div.KGiwt div div div:nth-child(5) a')

          //ambil username
          .wait("#react-root section main div header section div.nZSzR h2")
          .evaluate(function () {
            return document.querySelector(
              "#react-root section main div header section div.nZSzR h2"
            ).innerText;
          })
          .then(function (result) {
            nickname = result;
            console.log(nickname);
            $("#usernameIg").html(result);
          })

          //ambil postingan
          .then(function () {
            return electrolizer
              .wait(
                "#react-root section main div header section ul li:nth-child(1)"
              )
              .evaluate(function () {
                return document.querySelector(
                  "#react-root section main div header section ul li:nth-child(1)"
                ).innerText;
              });
          })
          .then(function (result) {
            postingan = result;
            console.log(postingan);
            $("#postinganIg").html(result);
          })

          //ambil followers
          .then(function () {
            return electrolizer
              .wait(
                "#react-root section main div header section ul li:nth-child(2)"
              )
              .evaluate(function () {
                return document.querySelector(
                  "#react-root section main div header section ul li:nth-child(2)"
                ).innerText;
              });
          })
          .then(function (result) {
            followers = result;
            console.log(followers);
            $("#followersIg").html(result);
          })

          //ambil following
          .then(function () {
            return electrolizer
              .wait(
                "#react-root section main div header section ul li:nth-child(3)"
              )
              .evaluate(function () {
                return document.querySelector(
                  "#react-root section main div header section ul li:nth-child(3)"
                ).innerText;
              });
          })
          .then(function (result) {
            following = result;
            console.log(following);
            $("#followingIg").html(result);
          })

          //ambil link pp
          .then(function () {
            return electrolizer
              .wait(
                "#react-root section main div header div div div button img"
              )
              .evaluate(function () {
                return document.querySelector(
                  "#react-root section main div header div div div button img"
                ).src;
              });
          })
          .then(function (result) {
            linkpp = result;
            console.log(linkpp);
            $("#gambar").attr("src", $("#gambar").attr("src") + result);
          })

          //coba logout
          .then(function () {
            return electrolizer.goto(
              "https://www.instagram.com/accounts/logout"
            );
          })
          .then(function (result) {
            console.log(result);
            electrolizer.end();
          })
          .then(function () {
            console.log("berhasil");
          })
          .catch(function (error) {
            console.error("error " + error);
          })
      );
    });
}

function tambahtr() {
  var table = document.getElementById("table");
  var row = table.insertRow(2);
  var cell1 = row.insertCell(0);
  const img = document.createElement("img");
  img.setAttribute("id", "gambar");
  img.setAttribute("class", "gambar")
  img.setAttribute("onload", "tambahdata()");
  img.setAttribute("src", "");
  cell1.appendChild(img);
  var cell2 = row.insertCell(1);
  cell2.setAttribute("id", "usernameIg");
  var cell3 = row.insertCell(2);
  cell3.setAttribute("id", "postinganIg");
  var cell4 = row.insertCell(3);
  cell4.setAttribute("id", "followersIg");
  var cell5 = row.insertCell(4);
  cell5.setAttribute("id", "followingIg");
  cell2.innerHTML = "wait..";
  cell3.innerHTML = "wait..";
  cell4.innerHTML = "wait..";
  cell5.innerHTML = "wait..";
}

/*Webview Cek Aktif*/
function cekAktif() {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cobaig",
    multipleStatements: true
  })
  con.connect(function(err){
    if(err) throw(err);
    var sql = "SELECT * FROM cobaig WHERE status='Active'"
    con.query(sql,function(err,result){
      if(err) throw(err);
      userActive = result[0].username
      userActive2 = result[0].password
    })  
  })
  var webviewlogin = document.getElementById("webviewLogin")
  webviewlogin.addEventListener("dom-ready", () => {
    webviewlogin.openDevTools();
  });
  const electrolizerActive = new Electrolizer(webviewlogin)

  electrolizerActive
  .wait('.sqdOP.yWX7d.y3zKF')
  .click('.sqdOP.yWX7d.y3zKF')
  .wait('.pexuQ')
  .type('.pexuQ', ""+userActive+"\u0009"+userActive2+"\u000d")
  .wait(10000)
  .goto('https://www.instagram.com/')
  .goto('https://www.instagram.com/accounts/logout')
  .run()
  .then(function(error){
    if(error) throw(error)
    swal.fire(
      'Berhasil Masuk'
    )
  })
}
