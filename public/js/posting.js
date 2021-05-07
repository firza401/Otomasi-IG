const electron = require('electron');
const {remote, ipcRenderer} = electron;
var { Electrolizer } = require("@ugenu.io/electrolizer");
const path = require('path');
const dbase = require('mysql')

const dialog = electron.remote.dialog; 
var uploadFile = document.getElementById('upload');

global.filepath = undefined; 
var isiCapt;

uploadFile.addEventListener('click', () => { 
  // If the platform is 'win32' or 'Linux' 
      if (process.platform !== 'darwin') { 
      
          dialog.showOpenDialog({ 
              title: 'Choose File', 
              defaultPath: path.join(__dirname, '../assets/'), 
              buttonLabel: 'UPLOAD', 
  
              filters: [ 
                  { 
                      name: 'image Files', 
                      extensions: ['txt', 'docx','jpg','jpeg','png'] 
                  }, ], 
   
              properties: ['openFile'] 
          }).then(file => { 
              
              console.log(file.canceled); 
              
              if (!file.canceled) { 
                
                global.filepath = file.filePaths[0].toString(); 
                console.log(global.filepath); 
              }   
          }).catch(err => { 
              console.log(err)  
          }); 
      } 
      else { 
          // If the platform is 'darwin' (macOS) 
          dialog.showOpenDialog({ 
              title: 'Choose File', 
              defaultPath: path.join(__dirname, '../assets/'), 
              buttonLabel: 'UPLOAD', 
              filters: [ 
                  { 
                      name: 'image Files', 
                      extensions: ['txt', 'docx','jpg','jpeg','png'] 
                  }, ], 
             
              properties: ['openFile', 'openDirectory'] 
          }).then(file => { 
              console.log(file.canceled); 
              if (!file.canceled) { 
                global.filepath = file.filePaths[0].toString(); 
                console.log(global.filepath); 
              }   
          }).catch(err => { 
              console.log(err) 
          }); 
      } 
  }); 

const webviewupl = document.getElementById("wvupload")
let coba = document.getElementById('coba');
coba.addEventListener('click', postPostingan)
webviewupl.addEventListener("dom-ready", () => {
  webviewupl.openDevTools();
})
function postPostingan(){
  var con = dbase.createConnection({
    host: "localhost", // Replace with your host name
    user: "root", // Replace with your database username
    password: "", // Replace with your database password
    database: "cobaig", // // Replace with your database Name
  })
  con.connect(function(err){
    if(err)throw(err)
    let i = "SELECT * FROM cobaig WHERE status='Active'";
  con.query(i, function(error,result){
  if(error)throw(error);
  let user1 = result[0].username;
  let user2 = result[0].password;
  })
  
})
  let isiCapt = document.getElementById('isiCapt').value
    console.log(isiCapt);
    const electrolizerActive = new Electrolizer(webviewupl)

    electrolizerActive
    .wait('sqdOP.yWX7d.y3zKF')
    .click('sqdOP.yWX7d.y3zKF')
    .exists('_2hvTZ.pexuQ.zyHYP')
    .then(function (result) {
      if (result) {
        function login() {
          electrolizer
            .wait('_2hvTZ.pexuQ.zyHYP')
            .type(
              '_2hvTZ.pexuQ.zyHYP',"" +user1+ "\u0009" +user2+ "\u000d"
            );
        }
        return postPostingan();
      }
    }
  )}